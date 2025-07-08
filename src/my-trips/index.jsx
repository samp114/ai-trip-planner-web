import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ FIXED
import { db } from "../service/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate(); // ✅ FIXED
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/"); // ✅ FIXED
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {userTrips.length === 0 ? (
        <p className="mt-10 text-gray-500">No trips found.</p>
      ) : (
        <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
          {userTrips.map((trip, index) => (
            <UserTripCardItem key={index} trip={trip} /> // ✅ Add `key`
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
