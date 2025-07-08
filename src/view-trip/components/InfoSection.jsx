import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from '../../components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';

// const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
function InfoSections({trip}) {

  const [PhotoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const locationLabel = trip?.userSelection?.location?.label;
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
    <div  >
        <img className='h-[340px] w-full object-cover rounded-xl' src={PhotoUrl?PhotoUrl:'/placeholder.jpg'}></img>
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
        <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 tx-xs md:text-md'>📅 {trip?.userSelection?.noofdays} days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 tx-xs md:text-md'>💰 {trip?.userSelection?.budget} budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 tx-xs md:text-md'>🫂 no. of traveller: {trip?.userSelection?.traveller}</h2>
        </div>
        </div>
        <Button ><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default InfoSections