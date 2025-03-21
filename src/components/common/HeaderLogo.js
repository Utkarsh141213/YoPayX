import React from 'react'
import { useNavigate } from 'react-router-dom'
import yatripayLogo from "../../assets/yatripay_logo.svg";

const HeaderLogo = () => {
    const navigate = useNavigate()
  return (
    <div
    onClick={() => navigate('/dashboard')}
    className="flex items-center justify-center sm:justify-start w-full sm:w-auto cursor-pointer">
        <img src={yatripayLogo} alt="yatripay logo" />
    </div>
  )
}

export default HeaderLogo