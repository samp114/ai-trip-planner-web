import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate, useNavigation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import axios from "axios";

function Header() {
  const [openDailog, setOpenDailog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
    flow: "implicit",
    scope: "openid profile email", // ✅ updated
  });
  
  const GetUserProfile = (tokenInfo) => {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log("Google User Info:", resp.data); // ✅ Check if picture exists
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        window.location.reload();
      });
  };
  
  // const navigation=useNavigate();
  useEffect(() => {
    console.log(user);
  });
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="" />
      <div>
      {user ? (
        <div className="flex gap-5 items-center bg-black">
          <a href='/Create-trip'>
          <Button variant="outline" className="rounded-full">
            +Create-Trip
          </Button>
          </a>
          <a href='/My-Trips'>
          <Button variant="outline" className="rounded-full">
            MyTrips
          </Button>
          </a>
          <Popover>
            <PopoverTrigger>
              <img src={user?.picture} className="h-[35px] w-[35px] rounded-full cursor-pointer bg-blue-100" />
            </PopoverTrigger>
            <PopoverContent>
              <h2 className='cursor-pointer' onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Logout</h2>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button className="bg-black text-white" onClick={()=>setOpenDailog(true)}>sign in</Button>
      )}
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

export default Header;