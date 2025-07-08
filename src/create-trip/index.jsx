import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input.jsx";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "../constants/options.jsx";
import { Button } from "../components/ui/button.jsx";
import { toast } from "sonner";
import { generateFinalPrompt } from "../utils/generatePrompt.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog.jsx";
import { X } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios, { Axios } from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../service/firebaseConfig.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { runPrompt } from "../service/AIModal.jsx";
import { useNavigate, useNavigation } from "react-router-dom";

function CreateTrip() {
  const navigate = useNavigate();
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
    flow: "implicit", // 🔥 This ensures access_token is available
    scope: "profile email",
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }
    setLoading(true);
    const prompt = generateFinalPrompt(formData);

    if (!prompt) {
      toast("Please fill complete details");
      return;
    }

    try {
      const responseData = await runPrompt(formData); // ✅ Await the API call
      await SaveAiTrip(responseData); // ✅ Await save to Firestore
    } catch (error) {
      console.error("Error generating or saving trip:", error);
      toast("Something went wrong while generating your trip.");
    } finally {
      setLoading(false); // ✅ Always reset loading state
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      TripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId, 
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your Destination ?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace();
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            for how many days you want to visit ?
          </h2>
          <Input
            placeholder={"ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noofdays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, i) => (
              <div
                key={i}
                onClick={(e) => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData?.budget == item.title && "shadow-lg border-black bg-purple-300"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure ?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, i) => (
              <div
                key={i}
                onClick={(e) => handleInputChange("traveller", item.people)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData?.traveller == item.people && "shadow-lg border-black bg-purple-300"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end my-10">
        <Button
          diabled={loading}
          className="bg-black text-white"
          onClick={OnGenerateTrip}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent className="bg-black text-white">
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />

              <h2 className="font-bold text-lgmt-7">Sign In</h2>
              <p>Sign in to the app with google authentication services</p>
              <Button
                onClick={login}
                className="w-full mt-5 bg-black text-white "
              >
                Sign In with google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;