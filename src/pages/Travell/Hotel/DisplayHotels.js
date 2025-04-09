import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext";
import { getHotelList } from "../../../services/travel/hotelAPI/hotelAPI";
import { toast } from "react-toastify";
import { getValueOfCoinByType } from "../../../services/fundsAPI/fundsAPI";
import CommonHotelHeader from "./CommonHotelHeader";


const HotelCard = ({ id, name, location, country, rating, imageUrl, price, handleClick, ytpToInr }) => {

    const [imgError, setImgError] = useState(false);
    const inrPrice = parseFloat(price);
    const ytpPrice = inrPrice / ytpToInr;

  return (
    <div
      onClick={() => handleClick(id)}
      className="rounded-lg hover:scale-105 transition-all cursor-pointer text-black bg-white shadow-md overflow-hidden relative"
    >
        <div className="relative w-full h-48">
        {!imgError ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-sm">
            No Image Available
          </div>
        )}
      </div>

      <div className="p-2 text-left">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="flex mt-[0.2rem]">
            <FaStar className="text-yellow-300 text-lg mr-1 mt-[0.08rem]" />
            <span className="text-gray-700 ">{rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 mb-3">
          <CiLocationOn className="mr-1" />
          <span className="text-sm">
            {location}, {country}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm border-t pt-1">
          <div className="flex justify-between w-full">
            <div>
              <span className="font-semibold">{ytpPrice.toFixed(2)} YTP</span>
            </div>
            <div className="text-gray-500">
              (1 YTP = {ytpToInr} INR)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DisplayHotels = () => {
  const { setIsLoading } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [ytpToInr, setYtpToInr] = useState([]);

  useEffect(() => {

    

    if (!location.state || !location.state.data) {
      toast.error('All the fields are required to fill')
      navigate("/search-hotel");
    }

    (async () => {
      const coin = await getValueOfCoinByType('YTP')
      setYtpToInr(Number(coin.data.INR).toFixed(2))
      try {
        setIsLoading(true);
        const res = await getHotelList(location.state.data);
        setHotels(res.HotelLists.HotelList);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
        navigate("/search-hotel")
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location.state]);

  const handleHotelCardLick = (id) => {
    location.state.data.hotelId = id

    navigate('/hotel-details', { state: { data : location.state.data }})
  }

  if(!hotels || !hotels.length > 0){
    return 
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-black min-h-screen">
      <div className="pb-5 px-2">
          <CommonHotelHeader
            text={"Hotels"}
            btnData={{ text: "History", onclick: () => {} }}
          />
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.EANHotelID}
            id={hotel.EANHotelID}
            name={hotel.Name}
            location={hotel.Address1}
            country={hotel.Country}
            rating={hotel.StarRating}
            imageUrl={hotel.thumbnail}
            handleClick={handleHotelCardLick}
            price={hotel.LowRate}
            ytpToInr={ytpToInr}
          />
        ))}
      </div>
    </div>
  );
};

// Example usage with sample data

export default DisplayHotels;
