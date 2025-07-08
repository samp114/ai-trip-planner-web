import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
    <h1 className='font-extrabold text-[50px] text-center mt-16'>
      <span className='text-[#5d28c5]'>Discover Your Next Adventure with AI: </span>Personalized Itineraries at Your Fingertips
    </h1>
    <p className='text-xl text-grey-500 text-center'>
    Whether you're chasing beaches or mountains, we tailor every journey to your preferences, timeframe, and budget—effortlessly.
    </p>
    <Link to={'/create-trip'}>
    <Button className='bg-black text-white'>Get Started, It's Free</Button>
    </Link>
    <img src="/travel-022.jpg" className='-mt-4'/>
    </div>
  )
}

export default Hero