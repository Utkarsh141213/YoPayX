// Document.js
import React, { useRef, useState } from "react";
import cameraSVG from "../../assets/kyc_icons/kyc_document_camera_icon.svg";
import { useKycContext } from "../../context/KycContext"; // Use the context
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";


const Document = () => {
  const { updateDocumentDetails, submitKyc } = useKycContext();
  const navigate = useNavigate()

  const [govtIdFile, setGovtIdFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [panNumber, setPanNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const govIdInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const handleGovtIdChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setGovtIdFile(e.target.files[0]);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateDocumentDetails({
      govtIdFile,
      photoFile,
      panNumber,
      phoneNumber,
    });

    try {
      await submitKyc();
      toast.success("KYC submitted successfully");
      navigate('/dashboard')
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-4xl px-4 md:px-40">
        <h1 className="text-white text-2xl font-bold text-center mb-6">
          Identity Verification
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <label className="text-white/50">Government ID</label>
          </div>

          <div className="rounded-md flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1">
              {/* Govt. ID Input */}
              <div className="flex mb-4 bg-white py-1 rounded gap-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={govIdInputRef}
                  onChange={handleGovtIdChange}
                  required
                  hidden
                  className="w-full p-3 rounded focus:outline-none"
                />
                {govtIdFile ? (
                  <div className="flex items-center gap-2 w-full p-2 text-xs rounded text-black/50 text-left whitespace-nowrap truncate cursor-pointer">
                    <span className=" whitespace-nowrap truncate ">
                      {govtIdFile.name}
                    </span>
                    <span
                      onClick={() => setGovtIdFile(null)}
                      className="text-black text-lg w-fit h-fit"
                    >
                      <RxCross2 />
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      govIdInputRef.current && govIdInputRef.current.click();
                    }}
                    className="  w-full p-3 text-xs rounded text-black/50 text-left whitespace-nowrap truncate cursor-pointer"
                  >
                    Govt. ID (PAN, Aadhaar card, Passport...)
                  </div>
                )}

                <span className="text-gray-400 text-sm min-h-full whitespace-nowrap flex items-center pr-3">
                  Max size 2MB
                </span>
              </div>

              {/* PAN Number Input */}
              <input
                type="text"
                placeholder="PAN Number"
                className="w-full mb-4 p-3 text-black rounded focus:outline-none"
                required
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
              />

              {/* Camera + Take Photo */}
              <div className="flex items-center justify-between py-3 px-8 sm:px-8 gap-2 mb-4 bg-white rounded">
                <div className="p-2 rounded text-black">
                  <img
                    src={cameraSVG}
                    alt="camera icon"
                    className="h-8 sm:h-16"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    profileInputRef.current && profileInputRef.current.click();
                  }}
                  className="bg-[#4BAF2A] text-lg sm:text-xl font-bold text-white w-fit py-4 sm:py-4 px-6 flex items-center rounded-xl hover:bg-green-600 transition"
                >
                  Take Photo
                </button>
                <input
                  id="photoFile"
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  required
                  hidden
                />
              </div>

              {/* Phone Number Input */}
              <input
                type="tel"
                pattern="[0-9]{10}"
                placeholder="Phone Number"
                className="w-full p-3 text-black rounded focus:outline-none"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Right Column (Preview Box) - Only visible on md+ */}
            <div className="hidden md:flex items-center justify-center w-1/3">
              {photoFile ? (
                <img
                  src={URL.createObjectURL(photoFile)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="bg-white w-full h-full rounded-2xl" />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex mt-3 justify-center sm:w-2/3">
            <button
              type="submit"
              className="bg-[#4BAF2A] text-xl mt-3 text-white font-semibold py-6 px-12 flex items-center justify-center rounded hover:bg-green-600 transition w-full sm:w-fit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Document;
