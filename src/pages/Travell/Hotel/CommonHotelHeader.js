import React from 'react'
import { useNavigate } from 'react-router-dom'

const CommonHotelHeader = ({ text, btnData}) => {

    const navigate = useNavigate()

  return (
    <div className='flex justify-between w-full'>
        <div className='text-2xl'>{text}</div>
        <div
            onClick={() => navigate('/hotel-history')}
         className=' cursor-pointer'>{btnData.text}</div>
    </div>
  )
}

export default CommonHotelHeader