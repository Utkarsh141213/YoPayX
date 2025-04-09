import React, { useContext, useState } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext";
import { bookHotel } from "../../../services/travel/hotelAPI/hotelAPI";
import { toast } from "react-toastify";
import { getKYC } from "../../../services/kycService";
import TransactionPin from "../../../components/KYC/TransactionPin";
import { sendYTP } from "../../../services/fundsAPI/fundsAPI";

const BookHotel = () => {
  const location = useLocation();
  const { setIsLoading } = useContext(GlobalContext);

  const [ showPinScreen, setShowPinScreen ] = useState(false)

  const bookingData = location.state?.bookingData;
  const hotelData = location.state?.hotelData;

  const {
    amount,
    totalAdults,
    totalChildren,
  } = bookingData;

  const {
    hotelName,
    hotelImg,
    hotelRating,
    checkIn,
    checkOut,
    roomType,
  } = hotelData;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

  const handleBookHotel = async () => {
    try {
      const KYC = await getKYC();
      if (KYC && KYC.data && KYC.data[0].status === "APPROVED") {
        setIsLoading(true);
        const res = await bookHotel(bookingData);
        setShowPinScreen(true);
        setIsLoading(false)
        // toast.success("Hotel booked successfully, enjoy your stay");

      } else {
        throw new Error("KYC Verification Required");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSubmit = async (pin) => {
    try {
        setIsLoading(true)
        const res = await sendYTP({
            pin,
            amount,
            ticker: "YTP",
            address: "0xee6d52f6b24dd3033888446d6e91410b21c30be1"
        })
        toast.success("Your booking has been successfully completed. Thank you! You’ll receive a confirmation email shortly")
        setShowPinScreen(false)
    } catch (error) {
        toast.error(error.response?.data?.message || 'Sorry, your booking was unsuccessful. Please try again later or contact support for assistance')
    }
    finally{
        setIsLoading(false)
    }
  }

  if(showPinScreen){
    return <TransactionPin isTransaction={true} onSubmitPin={handlePinSubmit}/>
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <div className="w-full flex flex-col justify-center max-w-md lg:max-w-2xl p-4  rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <h1 className="flex-1 text-center text-xl font-semibold ">
          Reservation
        </h1>

        {/* Card */}
        <div className="flex flex-col justify-center">
          {/* Hotel Image */}
          <div className="w-full">
            <img
              src={hotelImg}
              alt={hotelName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="w-full ">
            <div>
              <div className="flex items-center justify-between mt-2">
                <h2 className="text-3xl font-bold text-yellow-400">{hotelName}</h2>
                <div className="flex items-center bg-yellow-400 text-white px-2 py-1 rounded">
                  <span className="mr-1">{hotelRating}</span>
                  <FaStar />
                </div>
              </div>

              <ul className="mt-4 space-y-1 text-left">
                <li>{`${totalAdults + totalChildren}`} People</li>
                <li>{roomType.name}</li>
                <li>
                  {nights} Night{nights > 1 && "s"}
                </li>
                <li>
                  {checkInDate.toDateString().slice(4)} to{" "}
                  {checkOutDate.toDateString().slice(4)}
                </li>
              </ul>
            </div>

            
            <div>
              <div className="text-center text-2xl font-bold text-yellow-400">
                {amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {"YTP"}
              </div>
              <div
                onClick={handleBookHotel}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition cursor-pointer"
              >
                Complete Booking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHotel;
