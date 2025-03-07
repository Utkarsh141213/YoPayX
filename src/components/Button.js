import React from 'react'

const Button = ({handleFun, text}) => {
  return (
    <div
    className="bg-[#4BAF2A] hover:bg-green-600 text-white text-xl font-bold  py-[11px] px-8 rounded-lg transition cursor-pointer"
    onClick={handleFun}
    >
        {text}
    </div>
  )
}

export default Button