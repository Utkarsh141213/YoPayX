import { useState, useEffect, useRef, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";

import {
  getFlightList,
  getFlightSearchsuggestions,
} from "../../../services/travel/fligthAPI/flightAPI";
import { toast } from "react-toastify";
import { GlobalContext } from "../../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function FlightSearch() {
  const [tripType, setTripType] = useState("oneWay");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showTravelersModal, setShowTravelersModal] = useState(false);
  const [showFromOptions, setShowFromOptions] = useState(false);
  const [showToOptions, setShowToOptions] = useState(false);
  const [showClassOptions, setShowClassOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState({
    id: "1",
    name: "Economy",
  });
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimer = useRef(null);

  const departRef = useRef(null);
  const returnRef = useRef(null);

  const { setIsLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [travelers, setTravelers] = useState({
    adults: 0,
    children: [],
    infants: 0,
  });

  const modalRef = useRef(null);
  const classOptionsRef = useRef(null);

  const classOptions = [
    {
      id: "1",
      name: "Economy",
    },
    {
      id: "2",
      name: "Business",
    },
    {
      id: "3",
      name: "First Class",
    },
    {
      id: "4",
      name: "Premium Economy",
    },
  ];

  useEffect(() => {
    if (searchQuery) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        fetchSuggestions(searchQuery);
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    // Close modal when clicking outside
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowTravelersModal(false);
      }

      if (
        classOptionsRef.current &&
        !classOptionsRef.current.contains(event.target)
      ) {
        setShowClassOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (tripType === "oneWay") setReturnDate("");
  }, [tripType]);

  const handleSearch = async () => {
    if (fromLocation === "") {
      toast.error("error", "Please select Source City.");
      return;
    }

    if (toLocation === "") {
      toast.error("error", "Please select Destination City.");
      return;
    }

    // if (selectedFromDate === null) {
    //   newToast('error', 'Please select Depart Date.');
    //   return;
    // }

    if (travelers.adults === 0) {
      toast.error("error", "Please select number of passenger");
      return;
    }

    try {
      const params = {};

      setIsLoading(true);

      if (tripType === "oneWay") {
        params.adults = travelers?.adults;
        params.children = travelers?.children.length;
        params.infants = travelers?.infants;
        params.isOneWay = true;
        params.source = fromLocation?.CityCode;
        params.sourceCountry = fromLocation?.CountryName;
        params.destination = toLocation?.CityCode;
        params.destinationCountry = toLocation?.CountryName;
        params.departureDate = departDate;
        params.flightCategory = selectedClass.name;
      } else {
        params.adults = travelers?.adults;
        params.children = travelers?.children;
        params.infants = travelers?.infants;
        params.isOneWay = true;
        params.source = fromLocation?.CityCode;
        params.sourceCountry = fromLocation?.CountryName;
        params.destination = toLocation?.CityCode;
        params.destinationCountry = toLocation?.CountryName;
        params.departureDate = departDate;
        params.returnDate = returnDate;
        params.flightCategory = selectedClass.name;
      }

      const response = await getFlightList(params);
      if (response && response.response) {
        const { airlines, flights, destination, origin, fares } = response.response;

        navigate("/flights", {
          state: {
            airlines,
            flights,
            destination,
            origin,
            fares,
            adults: travelers?.adults,
            children: travelers?.children.length,
            infants: travelers?.infants,
            departureDate: departDate,
            params,
          },
        });
      }else {
        toast.error('Failed to fetch flight detials')
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const params = { q: query };
      const response = await getFlightSearchsuggestions(params);
      if (response) {
        setSuggestions(response);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  };

  const addChild = () => {
    setTravelers((prev) => ({
      ...prev,
      children: [...prev.children, 2],
    }));
  };

  const removeChild = (index) => {
    setTravelers((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    }));
  };

  const updateChildAge = (index, age) => {
    setTravelers((prev) => {
      const newChildren = [...prev.children];
      newChildren[index] = parseInt(age);
      return {
        ...prev,
        children: newChildren,
      };
    });
  };

  const getTravelersText = () => {
    if (
      travelers.adults === 0 &&
      travelers.children.length === 0 &&
      travelers.infants === 0
    ) {
      return "Select Traveler";
    }

    const total =
      travelers.adults + travelers.children.length + travelers.infants;
    const travelerText = total === 1 ? "Traveler" : "Travelers";
    return `${total} ${travelerText}`;
  };

  const renderFromSuggestions = () => (
    <div className="absolute top-full left-0 w-80 mt-2 bg-black border border-gray-700 rounded-lg shadow-lg z-10">
      <div className="p-2">
        <input
          type="text"
          className="w-full bg-gray-700 text-white p-2 rounded-md"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="max-h-60 text-left overflow-y-auto">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer hover:bg-gray-700"
            onClick={() => {
              setFromLocation(item);
              setShowFromOptions(false);
              setSearchQuery("");
            }}
          >
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-400">{item.city_fullname}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderToSuggestions = () => (
    <div className="absolute top-full right-0 w-80 mt-2 bg-black border border-gray-700 rounded-lg shadow-lg z-10">
      <div className="p-2">
        <input
          type="text"
          className="w-full bg-gray-700 text-white p-2 rounded-md"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="max-h-60 overflow-y-auto">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer hover:bg-gray-700"
            onClick={() => {
              setToLocation(item);
              setShowToOptions(false);
              setSearchQuery("");
            }}
          >
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-400">{item.city_fullname}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen max-w-3xl mx-auto  text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <div className="text-amber-400 cursor-pointer"></div>
          <h1 className="text-2xl font-bold text-amber-400 ml-2">Flight</h1>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div
            className={` py-4 px-6 font-medium rounded-lg border cursor-pointer ${
              tripType === "oneWay"
                ? "flight-border text-amber-400"
                : "border-gray-500 text-gray-400"
            }`}
            onClick={() => setTripType("oneWay")}
          >
            One Way Trip
          </div>
          <div
            className={`py-4 px-6 font-medium rounded-lg border cursor-pointer ${
              tripType === "roundTrip"
                ? "flight-border text-amber-400"
                : "border-gray-500 text-gray-400"
            }`}
            onClick={() => setTripType("roundTrip")}
          >
            Round Trip
          </div>
        </div>

        {/* FROM TO */}
        <div className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-400">From</div>
            <div className="text-sm text-gray-400">To</div>
          </div>

          {/* FROM */}
          <div className="flex justify-between">
            <div className="relative w-5/12">
              <div
                className="text-left cursor-pointer"
                onClick={() => {
                  setShowFromOptions(true);
                  setShowToOptions(false);
                  setSearchQuery("");
                }}
              >
                <div className="font-semibold text-gray-300">
                  {fromLocation ? `${fromLocation.name}` : "Select Source City"}
                </div>
                {fromLocation && (
                  <div className="text-sm  text-gray-400 truncate">
                    {`${fromLocation.CityName}, ${fromLocation.CountryName} `}
                  </div>
                )}
              </div>

              {showFromOptions && renderFromSuggestions()}
            </div>

            {/* TO */}
            <div className="relative w-5/12">
              <div
                className="text-right cursor-pointer"
                onClick={() => {
                  setShowToOptions(true);
                  setShowFromOptions(false);
                  setSearchQuery("");
                }}
              >
                <div className="font-semibold text-right text-gray-300">
                  {toLocation
                    ? `${toLocation.name}`
                    : "Select Destination City"}
                </div>
                {toLocation && (
                  <div className="text-sm text-gray-400 truncate">
                    {`${toLocation.CityName}, ${toLocation.CountryName} `}
                  </div>
                )}
              </div>

              {showToOptions && renderToSuggestions()}
            </div>
          </div>
        </div>

        {/* DATE */}
        <div className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-400">Depart</div>
            <div className="text-sm text-gray-400">Return</div>
          </div>

          <div className="flex justify-between pb-4">
            <div
              onClick={() => {
                if (!departDate) {
                  const todayStr = new Date().toISOString().split("T")[0];
                  setDepartDate(todayStr);
                }
                departRef.current?.showPicker?.();
              }}
              className="w-5/12 text-lg text-left relative bg-black rounded cursor-pointer"
            >
              <input
                ref={departRef}
                type="date"
                name="depart-date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                // max={maxDate}
                className={`absolute top-0 -left-2 md:-left-3 w-fit text-lg text-left outline-none bg-black placeholder-white appearance-none caret-white cursor-pointer ${
                  departDate
                    ? "text-white h-[1vh]"
                    : "text-transparent  h-[1px]"
                }`}
                style={{ colorScheme: "light" }}
              />
              {!departDate && (
                <label
                  htmlFor="checkOut"
                  className="absolute top-0 left-0  text-lg font-semibold flex items-center pointer-events-none text-white"
                >
                  Select Date
                </label>
              )}
            </div>

            <div
              onClick={() => {
                if (!returnDate) {
                  const todayStr = new Date().toISOString().split("T")[0];
                  setReturnDate(todayStr);
                }
                returnRef.current?.showPicker?.();
              }}
              className="w-5/12 text-lg text-right relative  rounded cursor-pointer"
            >
              <input
                ref={returnRef}
                type="date"
                name="return-date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                hidden={tripType === "oneWay"}
                // max={maxDate}
                className={`absolute top-0 -right-8 w-fit text-lg text-right bg-transparent outline-none placeholder-white appearance-none caret-white cursor-pointer ${
                  returnDate ? "text-white h-[1vh]" : "text-transparent h-[1px]"
                }`}
                style={{ colorScheme: "light" }}
              />
              {!returnDate && (
                <label
                  htmlFor="checkOut"
                  className="absolute top-0 right-0  text-lg font-semibold flex items-center pointer-events-none text-white"
                >
                  Select Date
                </label>
              )}
            </div>
          </div>
        </div>

        {/* TREVELLER DETIALS */}
        <div className="border rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-400">Travelers</div>
            <div className="text-sm text-gray-400">Class</div>
          </div>

          {/* TREVELLER DETIALS PERSON*/}
          <div className="flex justify-between">
            <div className="w-5/12">
              <div
                className="text-lg text-left font-semibold text-gray-300 cursor-pointer"
                onClick={() => setShowTravelersModal(true)}
              >
                {getTravelersText()}
              </div>
            </div>

            {/* TREVELLER DETIALS CLASS*/}
            <div className="w-5/12 relative">
              <div
                className="text-lg text-right font-semibold text-gray-300 cursor-pointer"
                onClick={() => setShowClassOptions(!showClassOptions)}
              >
                {selectedClass.name}
              </div>

              {showClassOptions && (
                <div
                  ref={classOptionsRef}
                  className="absolute -top-40 right-0 mt-2 bg-black border border-gray-700 rounded-lg shadow-lg z-10 w-48"
                >
                  {classOptions.map((option) => (
                    <div
                      key={option.id}
                      className="p-3 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelectedClass(option);
                        setShowClassOptions(false);
                      }}
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {showTravelersModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                ref={modalRef}
                className="border bg-black rounded-lg p-6 w-full max-w-md mx-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Select Travelers</h3>
                  <div
                    onClick={() => setShowTravelersModal(false)}
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    <RxCross2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="font-medium">Adults</div>
                      <div className="text-sm text-gray-400">Age 12+</div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          setTravelers((prev) => ({
                            ...prev,
                            adults: Math.max(0, prev.adults - 1),
                          }))
                        }
                      >
                        -
                      </div>
                      <span className="mx-4 w-6 text-center">
                        {travelers.adults}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          setTravelers((prev) => ({
                            ...prev,
                            adults: Math.min(9, prev.adults + 1),
                          }))
                        }
                      >
                        +
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="font-medium">Children</div>
                      <div className="text-sm text-gray-400">Age 1-11</div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          removeChild(travelers.children.length - 1)
                        }
                      >
                        -
                      </div>
                      <span className="mx-4 w-6 text-center">
                        {travelers.children.length}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer"
                        onClick={addChild}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  {travelers.children.length > 0 && (
                    <div className="mt-2 mb-4">
                      <div className="text-sm font-medium mb-2">Child Ages</div>
                      <div className="grid grid-cols-3 gap-2">
                        {travelers.children.map((age, index) => (
                          <div key={index} className="relative">
                            <select
                              className="w-full text-white text-center bg-gray-700 border border-gray-600 rounded p-2 pr-8 appearance-none"
                              value={age}
                              onChange={(e) =>
                                updateChildAge(index, e.target.value)
                              }
                            >
                              {[...Array(10)].map((_, i) => (
                                <option key={i} value={i + 2}>
                                  {i + 2} years
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Infants</div>
                      <div className="text-sm text-gray-400">Under 2</div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          setTravelers((prev) => ({
                            ...prev,
                            infants: Math.max(0, prev.infants - 1),
                          }))
                        }
                      >
                        -
                      </div>
                      <span className="mx-4 w-6 text-center">
                        {travelers.infants}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          setTravelers((prev) => ({
                            ...prev,
                            infants: Math.min(
                              travelers.adults,
                              prev.infants + 1
                            ),
                          }))
                        }
                        disabled={travelers.infants >= travelers.adults}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  {travelers.infants > 0 && (
                    <div className="mt-2 text-sm text-amber-400">
                      * Each infant must be accompanied by an adult
                    </div>
                  )}
                </div>

                <div
                  className="w-full bg-amber-500 text-white py-3 rounded-lg font-medium text-center cursor-pointer"
                  onClick={() => setShowTravelersModal(false)}
                >
                  Done
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          onClick={handleSearch}
          className="w-full bg-[#4BAF2A] text-white font-bold py-4 rounded-lg flex items-center justify-center cursor-pointer"
        >
          <LuSearch className="w-5 h-5 mr-2" />
          SEARCH
        </div>
      </div>
    </div>
  );
}
