import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { getValueOfCoinByType } from "../../../services/fundsAPI/fundsAPI";

export default function ShowFlights() {
  const location = useLocation();
  const {
    origin,
    destination,
    flights: initialFlights,
    adults,
    children,
    infants,
    departureDate,
  } = location?.state || {
    origin: "DEL",
    destination: "GAU",
    flights: [
      {
        ResultIndex: "1",
        Segments: [
          [
            {
              Origin: { DepTime: "2025-04-15T20:45:00" },
              Destination: { ArrTime: "2025-04-15T23:10:00" },
              Duration: 145,
              Airline: {
                AirlineName: "Indigo",
                AirlineCode: "6E",
                FlightNumber: "6048",
              },
              Baggage: "15 KGS",
              CabinBaggage: "7 KGS",
            },
          ],
        ],
        Fare: { PublishedFare: "9060.53" },
      },
      {
        ResultIndex: "2",
        Segments: [
          [
            {
              Origin: { DepTime: "2025-04-15T12:30:00" },
              Destination: { ArrTime: "2025-04-15T14:40:00" },
              Duration: 130,
              Airline: {
                AirlineName: "SpiceJet",
                AirlineCode: "SG",
                FlightNumber: "123",
              },
              Baggage: "20 KGS",
              CabinBaggage: "7 KGS",
            },
          ],
        ],
        Fare: { PublishedFare: "9125.71" },
      },
    ],
    adults: 1,
    children: 0,
    infants: 0,
    departureDate: "2025-04-10T00:00:00",
  };

  const [flights, setFlights] = useState(initialFlights || []);
  const [filterIndex, setFilterIndex] = useState(null);
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const [selectedFareIndex, setSelectedFareIndex] = useState(null);
  const [loading, setLoading] = useState(false); // Assuming no initial loading
  const [expandedIndices, setExpandedIndices] = useState({});
  const [inrToYtp, setInrToYtp] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const coin = await getValueOfCoinByType("YTP");
        setInrToYtp(Number(coin.data.INR).toFixed(2));
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const flattenedData = flights.flat();
    setFlights(flattenedData);
  }, []);

  const filtersData = [
    { id: "1", title: "Price" },
    { id: "2", title: "Non-Stop only" },
    { id: "3", title: "Morning 6:00 - 12PM" },
    { id: "4", title: "Evening 6:00PM - 12AM" },
  ];

  const flightDetailsData = [
    {
      id: "1",
      type: "SALE",
      price: 3699,
      baggage: "15 KGS",
      dateChangeFee: "Starting from ₹2750",
      cancellationFee: "Starting from ₹3000",
      seat: "Limited free seats",
      meal: null,
      discount: "Get Rs.600 OFF with GISUPER",
      lockPrice: "Lock this price at ₹344 for 4 days",
    },
    {
      id: "2",
      type: "SAVER",
      price: 5352,
      baggage: "15 KGS",
      dateChangeFee: "Starting from ₹2750",
      cancellationFee: "Starting from ₹3000",
      seat: "Limited free seats",
      meal: "Chargeable",
      discount: "Get Rs.600 OFF with GISUPER",
      lockPrice: "Lock this price at ₹348 for 4 days",
    },
    {
      id: "3",
      type: "FLEXI PLUS",
      price: 5748,
      baggage: "15 KGS",
      dateChangeFee: "No fee",
      cancellationFee: "No fee",
      seat: "Free seats",
      meal: "Free",
      discount: null,
      lockPrice: null,
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndices((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getFormattedDuration = (minutes) => {
    const hours = Math.floor((minutes ?? 0) / 60);
    const leftMinutes = (minutes ?? 0) % 60;
    return `${hours} hr ${leftMinutes} min`;
  };

  const getNumberOfStops = (segments) => {
    const stops = (segments?.length ?? 0) - 1;
    return stops === 0 ? "Non-Stop" : `${stops} Stop${stops > 1 ? "s" : ""}`;
  };

  const RenderFlightSegment = ({ segment }) => {
    const DepTime = dayjs(segment?.Origin?.DepTime).format("HH:mm");
    const ArrTime = dayjs(segment?.Destination?.ArrTime).format("HH:mm");
    const duration = getFormattedDuration(segment?.Duration);
    const airlineLogoUri = `https://travel.api.yatripay.com/static/airline_logos/${segment?.Airline?.AirlineCode?.toLowerCase()}.png`;
    const [imgLoadErr, setImgLoadErr] = useState(false);

    return (
      <div className=" space-x-2 ">
        <div className="flex items-center">
          {imgLoadErr ? (
            <div className="w-8"></div>
          ) : (
            <img
              src={airlineLogoUri}
              alt={`${segment?.Airline?.AirlineName} Logo`}
              className="w-8 h-10 object-contain"
              onError={(e) => setImgLoadErr(true)}
            />
          )}
          <div className=" text-gray-300">
            {segment?.Airline?.AirlineName} {segment?.Airline?.AirlineCode} -{" "}
            {segment?.Airline?.FlightNumber}
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="text-lg font-semibold">{DepTime}</div>
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-400">{duration}</div>
            <div className="md:w-40 w-16 h-0.5 bg-gray-600 my-1"></div>
          </div>
          <div className="text-lg font-semibold">{ArrTime}</div>
        </div>
        {/* {expandedIndices[index] && ( // index is not available here */}
        {/* <>*/}
        {/* <div className="text-xs text-gray-400">Baggage: {segment?.Baggage ?? '---'}</div>*/}
        {/* <div className="text-xs text-gray-400">Cabin Baggage: {segment?.CabinBaggage ?? '---'}</div>*/}
        {/* </>*/}
        {/* )} */}
      </div>
    );
  };

  const renderFlight = (flight, index) => {
    const x = Number(flight?.Fare?.PublishedFare) / inrToYtp;
    const segments = flight?.Segments?.[0] || [];
    // const isExpanded = expandedIndices[index];

    return (
      <div
        key={flight?.ResultIndex || index}
        className="border bg-gray-600/20 rounded-lg p-4 shadow-md mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="md:flex-1">
            {segments.map((segment) => (
              <RenderFlightSegment segment={segment} />
            ))}
            <div className=" text-sm text-gray-400 pl-3">
              {getNumberOfStops(segments)}
            </div>
          </div>
          <div className="md:flex-1 flex flex-col items-end">
            <div className="md:text-xl font-bold text-teal-400">
              {x?.toFixed(2)} YTP
            </div>
            <div
              className="bg-amber-400 hover:bg-amber-500 text-black font-bold p-2 md:py-2 md:px-4 rounded-md transition-colors cursor-pointer"
              onClick={() => {
                setSelectedFlightIndex(index);
                setShowFlightDetails(true);
              }}
            >
              Book Now
            </div>
          </div>
        </div>
        {/* <button onClick={() => toggleExpand(index)} className="text-gray-500 text-sm mt-2">
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </button>
        {isExpanded && (
          <div className="mt-2 p-2 bg-gray-700 rounded">
            {segments.map((segment, i) => (
              <div key={i} className="text-xs text-gray-300 py-1">
                Baggage ({segment?.Airline?.AirlineCode}): {segment?.Baggage ?? '---'}
                <br />
                Cabin Baggage ({segment?.Airline?.AirlineCode}): {segment?.CabinBaggage ?? '---'}
              </div>
            ))}
          </div>
        )} */}
      </div>
    );
  };

  const handleModal = () => {
    setShowFlightDetails(!showFlightDetails);
  };

  const handleSelectTicket = (index) => {
    setSelectedFareIndex(index);
  };

  const FlightFareDetailsModal = () => {
    if (!showFlightDetails || selectedFlightIndex === null) {
      return null;
    }

    const selectedFlight = flights[selectedFlightIndex];
    const airlineName =
      selectedFlight?.Segments?.[0]?.[0]?.Airline?.AirlineName || "Airline";

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-bold text-white mb-4">
            Please select a Fare for {airlineName}
          </h3>
          <div className="max-h-96 overflow-y-auto">
            {flightDetailsData.map((item, index) => (
              <div
                key={item.id}
                className={`bg-gray-800 rounded-md p-4 mb-2 ${
                  selectedFareIndex === index ? "border-2 border-teal-400" : ""
                }`}
                onClick={() => handleSelectTicket(index)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-semibold text-white">
                    {item.type}
                  </div>
                  <div className="text-lg font-bold text-teal-400">
                    ₹{item.price}
                  </div>
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  Check-in baggage: {item.baggage}
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  Date change fee per passenger: {item.dateChangeFee}
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  Cancellation fee per passenger: {item.cancellationFee}
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  Seat: {item.seat}
                </div>
                {item.meal && (
                  <div className="text-sm text-gray-300 mb-1">
                    Meal: {item.meal}
                  </div>
                )}
                {item.discount && (
                  <div className="text-sm text-green-400 mb-1">
                    {item.discount}
                  </div>
                )}
                {item.lockPrice && (
                  <div className="text-sm text-yellow-400">
                    {item.lockPrice}
                  </div>
                )}
                <div className="absolute bottom-2 right-2 border rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedFareIndex === index && (
                    <div className="rounded-full bg-teal-400 w-3 h-3" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
              onClick={handleModal}
            >
              Close
            </button>
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
              onClick={() => {
                handleModal();
                // console.log(
                //   "Book Now with fare:",
                //   flightDetailsData[selectedFareIndex]
                // );
              }}
              disabled={selectedFareIndex === null}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto  text-white">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header with Route info */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-100">{origin}</span>
              <FaArrowRightLong className="w-5 h-5 text-gray-400" />
              <span className="text-xl font-bold text-gray-100">
                {destination}
              </span>
            </div>
          </div>
          <div className="text-gray-400 text-left">
            {dayjs(departureDate).format("DD MMM 'YY")} | Adult {adults}, Child{" "}
            {children}, Infant {infants}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex space-x-2">
            {filtersData.map((filter, index) => (
              <div
                key={filter.id}
                className={` mb-2 md:mb-auto py-2 px-4 rounded-md text-sm font-semibold cursor-pointer whitespace-nowrap ${
                  filterIndex === index
                    ? "bg-green-500 text-white"
                    : "border text-gray-300 hover:bg-gray-700"
                } focus:outline-none`}
                onClick={() => setFilterIndex(index)}
              >
                {filter.title}
              </div>
            ))}
          </div>
        </div>

        {/* Flight Results */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-400">Loading flights...</div>
          ) : flights?.length > 0 ? (
            flights.map((flight, index) => renderFlight(flight, index))
          ) : (
            <div className="text-center text-gray-400">No flights found.</div>
          )}
        </div>

        {/* Flight Details Modal */}
        {/* {showFlightDetails && <FlightFareDetailsModal />} */}
      </div>
    </div>
  );
}
