import React, { useState } from "react";
import logo from "../../assets/yatri-pay-logo-main.png";

const TransactionPin = ({ onSubmitPin, onClose, isTransaction, transactionDetails }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  // Append a digit to the PIN
  const handleNumberClick = (number) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + number);
      setError("");
    }
  };

  // Remove the last digit from the PIN
  const handleBackspace = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  // Submit the PIN using the provided callback
  const handleSubmit = async () => {
    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN");
      return;
    }
    if (onSubmitPin) {
      await onSubmitPin(pin);
    }
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <img
            src={logo}
            alt="YatriPay Logo"
            className="max-w-[150px] h-auto mx-auto mb-8"
          />
          {isTransaction && transactionDetails && <div>
            <p>Sending: {transactionDetails}</p>
            </div>}
          <p className="text-white/50 text-sm text-center mb-8">
            {isTransaction ? 'Enter Your pin' : 'Create your 4-digit Transaction PIN'}
          </p>

          <div className="flex flex-col items-center">
            {/* PIN Dots */}
            <div className="flex justify-center mb-10">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-4 h-4 mx-2 rounded-full">
                  {index < pin.length ? pin[index] : "_"}
                </div>
              ))}
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Numeric Keypad */}
            <div className="bg-white rounded-lg p-4 grid grid-cols-3 gap-4 sm:w-[20vw]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <div
                  key={number}
                  onClick={() => handleNumberClick(number.toString())}
                  className="text-black/35 text-xl rounded-lg cursor-pointer text-center"
                >
                  {number}
                </div>
              ))}
              <div className="col-span-3 grid grid-cols-3 gap-4">
                <div />
                <div
                  onClick={() => handleNumberClick("0")}
                  className="text-black/35 text-xl rounded-lg cursor-pointer text-center"
                >
                  0
                </div>
                <div
                  onClick={handleBackspace}
                  className="text-black/40 text-xl rounded-lg cursor-pointer text-center"
                >
                  ←
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div
              onClick={handleSubmit}
              className="w-fit mt-10 bg-[#4BAF2A] text-white text-2xl font-bold py-3 px-10 rounded-xl flex items-center cursor-pointer"
            >
              Submit
            </div>
            {/* Optional Close Button */}
            {onClose && (
              <div
                onClick={onClose}
                className="mt-4 text-white underline cursor-pointer"
              >
                Cancel
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default TransactionPin;
