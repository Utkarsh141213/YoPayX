import React, { useState } from 'react'

const TransactionPin = () => {

    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
  
    const handleNumberClick = (number) => {
      if (pin.length < 4) {
        setPin(prevPin => prevPin + number);
        setError('');
      }
    };
  
    const handleBackspace = () => {
      setPin(prevPin => prevPin.slice(0, -1));
    };
  
    const handleSubmit = () => {
      if (pin.length === 4) {
        // Here you would typically send the PIN to your backend for validation
        console.log('PIN submitted:', pin);
        // Reset PIN or navigate to next screen
        alert(`PIN Submitted Successfully!`);
      } else {
        setError('Please enter a 4-digit PIN');
      }
    };

  return (

    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-white text-2xl font-bold text-center mb-16">YatriPay</h1>
        <p className="text-white/50 text-sm text-center mb-16">Create your 4-digit Transaction PIN</p>
        
        <div className='flex flex-col items-center '>
        {/* PIN Dots */}
        <div className="flex justify-center mb-10">
          {[...Array(4)].map((_, index) => (
            <div 
              key={index} 
              className={`w-4 h-4 mx-2 rounded-full `}
            >{index < pin.length ? pin[index] : '_'}</div>
          ))}
        </div>
        
        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        
        {/* Numeric Keypad */}
        <div className="bg-white rounded-lg p-4 grid grid-cols-3 gap-4 sm:w-[20vw] ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <div
              key={number}
              onClick={() => handleNumberClick(number.toString())}
              className=" text-black/35 text-xl  rounded-lg cursor-pointer transition"
            >
              {number}
            </div>
          ))}
          
          {/* 0 and Backspace */}
          <div className="col-span-3 grid grid-cols-3 gap-4">
            <div></div>
            <div
              onClick={() => handleNumberClick('0')}
              className=" text-black/35 text-xl  rounded-lg cursor-pointer transition"
            >
              0
            </div>
            <div
              onClick={handleBackspace}
              className=" text-black/40 text-xl  rounded-lg cursor-pointer transition"
            >
              ←
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-fit mt-10 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-6 px-10 rounded-lg flex items-center"
        >
          Submit
        </button>

      </div>
    </div>
    </div>

  )
}

export default TransactionPin