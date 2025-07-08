import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>

    <div className='hover:scale-105 transition-all'>
        <img src={PhotoUrl?PhotoUrl:'/placeholder.jpg'} className="object-cover rounded-xl h-[300px] w-[300px]"/> 
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noofdays} days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem