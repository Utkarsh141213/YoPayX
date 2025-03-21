import React from 'react'
import { Link } from 'react-router-dom'
import { RiHome2Line } from "react-icons/ri";

const BackToHomeButton = () => {
  return (
    <Link
        to={'/dashboard'}
        className='feature-box px-3 py-[0.6rem] bg-[#FFFFFF21] rounded-lg text-white'
    ><RiHome2Line /></Link>
  )
}

export default BackToHomeButton