import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";

function PlaceCardItem({ place }) {

    const [PhotoUrl,setPhotoUrl]=useState();
          useEffect(()=>{
            place&&GetPlacePhoto();
          },[place])
        
          const GetPlacePhoto=async()=>{
            const locationLabel = place?.placeName;
          if (!locationLabel) return;
            try {
            const response = await GetPlaceDetails(locationLabel); // ✅ use await instead of .then
            // console.log("Place photo data:", response.data.places[0].photos[3].name);
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',response.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
          
          } catch (error) {
            console.error("Error fetching place photo:", error.message);
          } 
          }



  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className="border rounded-xl mt-2 p-3 flex gap-5 hover:scale-105 transition-all">
        <img
          className="w-[130px] h-[130px] rounded-xl object-cover"
          src={PhotoUrl?PhotoUrl:'/placeholder.jpg'}
        />
        <div>
          <h2 className="font-bold text-lg">{place?.placeName}</h2>
          <p className="text-sm text-gray-400">{place?.placeDetails}</p>
          <p className="mt-2">⏱️{place?.travelTime}</p>

          <p className="text-sm text-gray-400">🎟️{place?.ticketPricing}</p>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;