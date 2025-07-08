import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <div>
            {trip?.TripData?.itinerary.map((item,index)=>(
                <div>
                    <h2 className='font-medium text-lg'>{item?.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>

                    {item?.places.map((places,index)=>(
                        <div className='my-3'>
                            <h2 className='font-medium text-sm text-orange-600'>{places?.bestTimeToVisit}</h2>
                            <PlaceCardItem place={places}/>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit