import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getHotelDetails } from "../../../services/travel/hotelAPI/hotelAPI";
import { getValueOfCoinByType } from "../../../services/fundsAPI/fundsAPI"; // Assuming this path is correct

const RoomOption = ({ rate, roomType, selectedRooms, handleRoomSelection, ytpToInr }) => {
  const inrPrice = parseFloat(rate.net);
  const ytpPrice = inrPrice / ytpToInr;

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center">
        <p className="text-amber-500 font-medium">
          {ytpPrice.toFixed(2)} YTP per night
        </p>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name={roomType.code}
            checked={selectedRooms[roomType.code] === rate.rateKey}
            onChange={() => handleRoomSelection(roomType.code, rate.rateKey)}
            className="h-5 w-5 text-black focus:ring-amber-500 cursor-pointer"
          />
        </label>
      </div>
      <p className="text-gray-4100 text">{rate.boardName}</p>
      {rate.cancellationPolicies && rate.cancellationPolicies.length > 0 && (
        <p className="text-gray-300 text-sm">
          Cancellation:{" "}
          {(rate.cancellationPolicies[0].amount / ytpToInr).toFixed(2)} YTP
          (from {new Date(rate.cancellationPolicies[0].from).toLocaleDateString()}
          )
        </p>
      )}
    </div>
  );
};

const RoomTypeSection = ({
  roomType,
  selectedRooms,
  handleRoomSelection,
  openBookingModal,
  ytpToInr,
}) => {
  const [isErrorShown, setIsErrorShown] = useState(false);

  const checkHotelAvailabilityFn = async () => {
    // cosnt
  }

  return (
    <div className="bg-[#FFFFFF21] p-4 rounded-xl border-t border-gray-700 text-left">
      <h3 className="font-bold text-gray-300 mb-2">{roomType.name}</h3>
      {roomType.rates &&
        roomType.rates.map((rate) => (
          <RoomOption
            key={`${roomType.code}${Math.random().toFixed(4)}`}
            rate={rate}
            roomType={roomType}
            selectedRooms={selectedRooms}
            handleRoomSelection={handleRoomSelection}
            ytpToInr={ytpToInr}
          />
        ))}
      {isErrorShown && <div className="text-center text-red-400">Please select a room</div>}
      <div
        onClick={() => {
          console.log(roomType);
          if (selectedRooms[roomType.code]) {
            openBookingModal(roomType.code);
          } else {
            setIsErrorShown(true);
            setTimeout(() => {
              setIsErrorShown(false);
            }, 2000);
          }
        }}
        className="bg-[#4BAF2A] text-white p-3 w-full rounded-md text-center font-medium mt-2 cursor-pointer"
      >
        Book Now
      </div>
    </div>
  );
};

const HotelDetails = () => {
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentRoomCodeForBooking, setCurrentRoomCodeForBooking] = useState(null);
  const [guestDetails, setGuestDetails] = useState([]);
  const [ytpToInr, setYtpToInr] = useState(null); // State to store the YTP to INR rate
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const fetchYtpRate = async () => {
      try {
        const coin = await getValueOfCoinByType('YTP');
        if (coin?.data?.INR) {
          setYtpToInr(Number(coin.data.INR));
        } else {
          console.error("Could not fetch YTP to INR rate.");
          setError("Could not fetch YTP to INR rate.");
        }
      } catch (err) {
        console.error("Error fetching YTP rate:", err);
        setError("Error fetching YTP rate.");
      }
    };

    fetchYtpRate();
  }, []);

  useEffect(() => {
    if (!location.state || !location.state.data) {
      console.warn("No hotel data received via location state.");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getHotelDetails(location.state.data);
        setHotelData(res);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleRoomSelection = (roomCode, option) => {
    setSelectedRooms({
      ...selectedRooms,
      [roomCode]: option,
    });
  };

  const openBookingModal = (roomCode) => {
    setCurrentRoomCodeForBooking(roomCode);
    setIsBookingModalOpen(true);

    // Get room information from the previous page
    const roomsInfo = location.state?.data?.roomsInfo || [];

    // Initialize guest details structure based on rooms info
    const initialGuestDetails = roomsInfo.map((room) => {
      return {
        adultFirstName: "",
        adultLastName: "",
        children: Array(room.children || 0).fill(null).map(() => ({ firstName: "", lastName: "" })),
      };
    });

    setGuestDetails(initialGuestDetails);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setCurrentRoomCodeForBooking(null);
    setGuestDetails([]);
  };

  const handleAdultFirstNameChange = (index, value) => {
    const newGuestDetails = [...guestDetails];
    if (!newGuestDetails[index]) {
      newGuestDetails[index] = {};
    }
    newGuestDetails[index].adultFirstName = value;
    setGuestDetails(newGuestDetails);
  };

  const handleAdultLastNameChange = (index, value) => {
    const newGuestDetails = [...guestDetails];
    if (!newGuestDetails[index]) {
      newGuestDetails[index] = {};
    }
    newGuestDetails[index].adultLastName = value;
    setGuestDetails(newGuestDetails);
  };

  const handleChildFirstNameChange = (roomIndex, childIndex, value) => {
    const newGuestDetails = [...guestDetails];
    if (!newGuestDetails[roomIndex]) {
      newGuestDetails[roomIndex] = {};
    }
    if (!newGuestDetails[roomIndex].children) {
      newGuestDetails[roomIndex].children = [];
    }
    newGuestDetails[roomIndex].children[childIndex].firstName = value;
    setGuestDetails(newGuestDetails);
  };

  const handleChildLastNameChange = (roomIndex, childIndex, value) => {
    const newGuestDetails = [...guestDetails];
    if (!newGuestDetails[roomIndex]) {
      newGuestDetails[roomIndex] = {};
    }
    if (!newGuestDetails[roomIndex].children) {
      newGuestDetails[roomIndex].children = [];
    }
    newGuestDetails[roomIndex].children[childIndex].lastName = value;
    setGuestDetails(newGuestDetails);
  };

  const handleConfirmBooking = () => {
    const selectedRoomDetails = [];
    let totalAmount = 0;
    let totalRooms = 0;
    let totalChildren = 0;
    let bookedRoomType = null; 

    const roomTypeArray = hotelData?.RoomTypes?.RoomGroup || [];
    const roomsInfo = location.state?.data?.roomsInfo || [];
    const selectedRateKey = selectedRooms[currentRoomCodeForBooking]; // Get the rateKey of the selected room type

    Object.keys(selectedRooms).forEach((roomCode, index) => {
      const rateKey = selectedRooms[roomCode];
      const roomType = roomTypeArray.find((rt) => rt.code === roomCode);
      const selectedRate = roomType?.rates?.find(
        (rate) => rate.rateKey === rateKey
      );

      const roomData = roomsInfo[index] || { adults: 1, children: 0, childrenAges: [] };
      totalChildren += roomData.children || 0;

      // Create paxes array with the adult and all children
      const paxes = [];

      // Add adult information
      if (guestDetails[index]?.adultFirstName && guestDetails[index]?.adultLastName) {
        paxes.push({
          roomId: index + 1,
          type: "AD",
          name: guestDetails[index].adultFirstName,
          surname: guestDetails[index].adultLastName
        });
      }

      // Add children information
      if (roomData.children > 0 && guestDetails[index]?.children) {
        guestDetails[index].children.forEach((child, childIdx) => {
          if (child?.firstName && child?.lastName) {
            paxes.push({
              roomId: index + 1,
              type: "CH",
              name: child.firstName,
              surname: child.lastName,
              age: roomData.childrenAges?.[childIdx] || 0
            });
          }
        });
      }

      if (selectedRate) {
        totalAmount += selectedRate.net / ytpToInr; // Use the fetched exchange rate
        totalRooms++;
        selectedRoomDetails.push({
          rateKey: selectedRateKey, // Use the selected rateKey for all rooms
          paxes: paxes
        });
      }


      if (index === 0 && roomType) {
        bookedRoomType = roomType;
      }
    });

    // Validate that all required names are provided
    const allNamesProvided = guestDetails.every((room, idx) => {
      // Check if adult name is provided
      if (!room?.adultFirstName || !room?.adultLastName) return false;

      // Check if all children names are provided
      const roomInfo = roomsInfo[idx] || { children: 0 };
      if (roomInfo.children > 0) {
        return room?.children?.every(child => child?.firstName !== "" && child?.lastName !== "") || false;
      }

      return true;
    });

    if (allNamesProvided && ytpToInr !== null) {
      const bookingData = {
        holderFirstName: guestDetails[0]?.adultFirstName || "",
        holderLastName: guestDetails[0]?.adultLastName || "",
        amount: totalAmount.toFixed(2),
        totalRooms: totalRooms,
        totalAdults: roomsInfo.reduce((sum, room) => sum + (room.adults || 1), 0),
        totalChildren: totalChildren,
        isToleranceApplicable: "Yes",
        roomsInfo: selectedRoomDetails,
      };

      closeBookingModal();
      navigate("/book-hotel", {
        state: {
          bookingData,
          hotelData: {
            ...location.state.data,
            hotelName: hotelData.HotelSummary.Name,
            hotelImg: hotelData.HotelImages.HotelImage[0].url,
            hotelRating: hotelData.HotelSummary.hotelRating,
            roomType: bookedRoomType
          }
        }
      });
    } else if (!allNamesProvided) {
      alert("Please enter names for all guests (adults and children).");
    } else if (ytpToInr === null) {
      alert("Could not fetch currency exchange rate. Please try again later.");
    }
  };

  const businessAmenities = hotelData?.BusinessAmenities?.BusinessAmenity || [];

  if (loading) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        Loading hotel details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        Error loading hotel details: {error.message}
      </div>
    );
  }

  if (!hotelData) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        No hotel data available.
      </div>
    );
  }

  if (ytpToInr === null) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        Loading currency exchange rate...
      </div>
    );
  }

  const { HotelSummary, HotelDetails: hotelDetails, RoomTypes } = hotelData;
  const roomsInfo = location.state?.data?.roomsInfo || [];

  return (
    <div className="text-white min-h-screen flex flex-col max-w-4xl mx-auto relative">
      {/* Header */}
      <div className="p-4 flex items-center border-b border-gray-700">
        <h1 className="text-amber-500 font-medium ml-2 text-4xl">
          {HotelSummary.Name}
        </h1>
      </div>

      <div className="flex-grow overflow-y-auto">
        {/* Hotel Image */}
        <div className="relative">
          {hotelData.HotelImages &&
            hotelData.HotelImages.HotelImage &&
            hotelData.HotelImages.HotelImage.length > 0 && (
              <img
                src={hotelData.HotelImages.HotelImage[0].url}
                alt={`Hotel ${HotelSummary.Name} at night`}
                className="object-contain h-[] w-[50vw]"
              />
            )}
        </div>

        {/* Hotel Location */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-gray-400 uppercase text-sm font-medium">
            {HotelSummary.Address1}
          </p>
        </div>

        {/* Hotel Description */}
        <div className="px-4 py-2">
          <p className="text-gray-100 text mb-3">
            {hotelDetails?.propertyDescription
              ?.split("\n")
              .map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  <br />
                </React.Fragment>
              ))}
          </p>
        </div>

        {/* Amenities */}
        <div className="px-4 py-2 text-left">
          <h2 className="font-bold text-gray-300 mb-2">Amenities</h2>
          <ul className="text-sm text-gray-400 list-disc list-inside">
            {businessAmenities.map((amenity) => (
              <li key={amenity.id}>{amenity.businessamenity}</li>
            ))}
          </ul>
        </div>

        {/* Room Options */}
        <div className="mt-2 space-y-10">
          {RoomTypes &&
            RoomTypes.RoomGroup &&
            RoomTypes.RoomGroup.map((roomType) => (
              <RoomTypeSection
                key={roomType.code}
                roomType={roomType}
                selectedRooms={selectedRooms}
                handleRoomSelection={handleRoomSelection}
                openBookingModal={openBookingModal}
                ytpToInr={ytpToInr}
              />
            ))}
        </div>
      </div>

      {isBookingModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/20 bg-opacity-50 flex items-center justify-center">
          <div className="p-8 rounded-xl bg-black max-h-[90vh] overflow-y-auto w-[90%] max-w-xl">
            <h2 className="text-xl font-bold text-gray-300 mb-4">
              Enter Guest Details
            </h2>

            {roomsInfo.map((room, roomIndex) => (
              <div key={roomIndex} className="mb-6 pb-4 border-b border-gray-700 text-left">
                <h3 className="text-lg text-gray-400 mb-3">
                  Room {roomIndex + 1} Details
                </h3>

                {/* Adult Information */}
                <div className="mb-3">
                  <label className="block text-gray-300 mb-1">Adult Name</label>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="bg-black feature-box text-white rounded-md p-2 w-1/2"
                      value={guestDetails[roomIndex]?.adultFirstName || ""}
                      onChange={(e) => handleAdultFirstNameChange(roomIndex, e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="bg-black feature-box text-white rounded-md p-2 w-1/2"
                      value={guestDetails[roomIndex]?.adultLastName || ""}
                      onChange={(e) => handleAdultLastNameChange(roomIndex, e.target.value)}
                    />
                  </div>
                </div>

                {/* Children Information - Only show if room has children */}
                {room.children > 0 && (
                  <div className="mt-2">
                    <div className="text-gray-300 mb-2">Children Names</div>
                    {Array.from({ length: room.children }).map((_, childIndex) => (
                      <div key={childIndex} className="mb-2">
                        <label className="text-sm text-gray-400 block mb-1">
                          Child {childIndex + 1} Name
                          {room.childrenAges && ` (Age: ${room.childrenAges[childIndex] || 0})`}
                        </label>
                        <div className="flex space-x-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            className="bg-black feature-box text-white rounded-md p-2 w-1/2"
                            value={guestDetails[roomIndex]?.children?.[childIndex]?.firstName || ""}
                            onChange={(e) => handleChildFirstNameChange(roomIndex, childIndex, e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="bg-black feature-box text-white rounded-md p-2 w-1/2"
                            value={guestDetails[roomIndex]?.children?.[childIndex]?.lastName || ""}
                            onChange={(e) => handleChildLastNameChange(roomIndex, childIndex, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end space-x-4 mt-4">
              <div
                onClick={closeBookingModal}
                className="bg-red-500 flex-1 text-white rounded-md p-2 cursor-pointer text-center"
              >
                Cancel
              </div>
              <div
                onClick={handleConfirmBooking}
                className="bg-[#4BAF2A] flex-1 rounded-md p-2 cursor-pointer text-center"
              >
                Confirm Booking
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;