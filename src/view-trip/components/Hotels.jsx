import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
        <div className='grid grid-col-2 md:grid-col-3 lg:grid-cols-4 gap-5'>
            {trip?.TripData?.hotels.map((items,index)=>(
                <HotelCardItem items={items}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels