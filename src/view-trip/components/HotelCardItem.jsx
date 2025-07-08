import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";

function HotelCardItem({ items }) {

    const [PhotoUrl,setPhotoUrl]=useState();
      useEffect(()=>{
        items&&GetPlacePhoto();
      },[items])
    
      const GetPlacePhoto=async()=>{
        const locationLabel = items?.hotelName;
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
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        items?.hotelName +
        "," +
        items?.address
      }
      target="_blank"
    >
      <div className="hover:scale-110 transition-all">
        <img className="rounded-xl mt-2 h-[180px] w-full object-cover" src={PhotoUrl?PhotoUrl:'/placeholder.jpg'} />
        <div className="my-2">
          <h2 className="font-medium">{items?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {items?.address}</h2>
          <h2 className="text-sm">💰{items?.price}</h2>
          <h2 className="text-sm">⭐{items?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;