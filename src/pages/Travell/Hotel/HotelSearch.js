import React, { useRef, useState } from "react";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { getSearchsuggestions } from "../../../services/travel/hotelAPI/hotelAPI";
import { useNavigate } from "react-router-dom";
import CommonHotelHeader from "./CommonHotelHeader";
import { toast } from "react-toastify";
import logo from "../../../assets/yatripay_logo.svg"

const HotelSearch = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: "",
    destinationCode: "",
    checkIn: "",
    checkOut: "",
    roomsAndGuests: "",
    totalRooms: 0,
    roomsInfo: [],
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimer = useRef(null);
  const [suggestionSelected, setSuggestionSelected] = useState(false); // New state to track if a suggestion was selected

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  // Debounced API call to get search suggestions
  const fetchSuggestions = async (query) => {
    try {
      const params = { max: 5, lang: "en", q: query };
      const response = await getSearchsuggestions(params);
      if (response?.cities) {
        setSuggestions(response.cities);
      }
    } catch (err) {
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "location") {
      setSuggestionSelected(false); // Reset suggestionSelected when input changes
      setFormData((prev) => ({ ...prev, location: value }));
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        if (value.trim().length > 0) {
          fetchSuggestions(value);
        } else {
          setSuggestions([]);
        }
      }, 300);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.destinationCode) {
      toast.error("Please select a location from the suggestions.");
      return;
    }

    if (!formData.checkIn || !formData.checkOut) {
      toast.error("Please enter both check-in and check-out dates.");
      return;
    }

    if (formData.totalRooms === 0) {
      toast.error("Please add at least one room.");
      return;
    }

    for (const room of rooms) {
      if (room.adults < 1) {
        toast.error("Each room must have at least one adult.");
        return;
      }
      if (room.children > 0 && room.childrenAges.length !== room.children) {
        toast.error("Please provide the age for each child in every room.");
        return;
      }
    }

    navigate("/hotels", { state: { data: formData } });
  };

  const handleSuggestionSelect = (sugg) => {
    setFormData((prev) => ({
      ...prev,
      location: sugg.fullname,
      destinationCode: sugg.destinationCode,
    }));
    setShowSuggestions(false);
    setSuggestionSelected(true); // Set to true when a suggestion is selected
  };

  const handleLocationBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      if (!suggestionSelected) {
        setFormData((prev) => ({ ...prev, location: "", destinationCode: "" }));
        setSuggestions([]);
      }
    }, 100);
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split("T")[0];

  // Calculate date 1 year from now for max date attribute
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const maxDate = nextYear.toISOString().split("T")[0];

  const [showRoomsPopup, setShowRoomsPopup] = useState(false);
  // Each element: { adults: number, children: number, childrenAges: [] }
  const [rooms, setRooms] = useState([
    { adults: 0, children: 0, childrenAges: [] },
  ]);

  // Add another room
  const handleAddRoom = () => {
    setRooms([...rooms, { adults: 0, children: 0, childrenAges: [] }]);
  };

  // Increment or decrement adults/children count
  const handleCountChange = (roomIndex, type, action) => {
    const updatedRooms = [...rooms];
    const room = updatedRooms[roomIndex];

    if (action === "increment") {
      // Only allow increment if total (adults + children) is less than 4
      if (room.adults + room.children < 4) {
        room[type] = room[type] + 1;

        // If children increased, add a new age slot (default to 0)
        if (type === "children") {
          room.childrenAges.push(0);
        }
      }
    } else if (action === "decrement" && room[type] > 0) {
      room[type] = room[type] - 1;

      // If children decreased, remove the last age slot
      if (type === "children") {
        room.childrenAges.pop();
      }
    }

    setRooms(updatedRooms);
  };

  // Handle child age change
  const handleChildAgeChange = (roomIndex, childIndex, age) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childrenAges[childIndex] = parseInt(age, 10);
    setRooms(updatedRooms);
  };

  // Summaries
  const getTotalGuests = () =>
    rooms.reduce((acc, room) => acc + room.adults + room.children, 0);

  // When user clicks "Done"
  const handleRoomsDone = () => {
    // Filter out rooms that have zero total persons
    const filteredRooms = rooms.filter(
      (room) => room.adults + room.children > 0
    );

    const totalRooms = filteredRooms.length;
    const totalGuests = filteredRooms.reduce(
      (acc, room) => acc + room.adults + room.children,
      0
    );

    const roomsText = `${totalRooms} Room${totalRooms > 1 ? "s" : ""}`;
    const guestsText = `${totalGuests} Guest${totalGuests !== 1 ? "s" : ""}`;

    // Update the form data with the filtered rooms info and remove empty rooms
    setFormData((prev) => ({
      ...prev,
      roomsAndGuests: `${roomsText}, ${guestsText}`,
      totalRooms: totalRooms,
      roomsInfo: filteredRooms.map((room) => ({
        adults: room.adults,
        children: room.children,
        childrenAge: room.childrenAges,
      })),
    }));

    // Optionally update the rooms state with the filtered rooms (if needed)
    setRooms(filteredRooms);
    setShowRoomsPopup(false);
  };

  return (
    <div className="flex flex-col px-2 items-center justify-center min-h-screen">
      <div className="mb-10">
        <img src={logo} alt="yatri pay logo" />
      </div>
      <div className="w-full max-w-md relative">
        <div className="pb-5 px-2">
          <CommonHotelHeader
            text={"Hotels"}
            btnData={{ text: "History", onclick: () => {} }}
          />
        </div>

        <form onSubmit={handleSubmit} className="relative">
          {/* LOCATION INPUT */}
          <div className="mb-4 relative">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleLocationBlur}
              className="w-full bg-white rounded py-3 px-4 text-black placeholder-black/60 text-sm"
            />
            {showSuggestions && formData.location && (
              <ul className="absolute bg-white border border-gray-300 w-full rounded mt-1 max-h-60 overflow-y-auto z-10 list-none">
                {suggestions.length ? (
                  suggestions.map((sugg, index) => (
                    <li
                      key={index}
                      onMouseDown={() => handleSuggestionSelect(sugg)}
                      className="py-2 px-4 text-left list-none text-black hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                    >
                      {sugg.fullname}
                    </li>
                  ))
                ) : (
                  <li className="py-2 px-4 text-left text-gray-500">
                    No suggestions found
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* CHECK-IN, CHECK-OUT */}
          <div className="mb-4 flex gap-2">
            <div
              onClick={() => {
                if (checkInRef.current) {
                  if (!formData.checkIn) {
                    const todayStr = new Date().toISOString().split("T")[0];
                    setFormData((prev) => ({ ...prev, checkIn: todayStr }));
                  }
                  checkInRef.current?.showPicker?.();
                }
              }}
              className="w-1/2 relative bg-white rounded "
            >
              <input
                ref={checkInRef}
                type="date"
                name="checkIn"
                placeholder="Check in"
                value={formData.checkIn}
                onChange={handleDateChange}
                min={today}
                max={maxDate}
                className={`w-full py-3 px-4 placeholder-black/60 text-sm appearance-none caret-black cursor-pointer ${
                  formData.checkIn
                    ? "text-black select-text"
                    : "text-transparent select-none"
                }`}
                style={{ colorScheme: "light" }}
              />
              {!formData.checkIn && (
                <label
                  htmlFor="checkIn"
                  className="absolute top-0 left-0 w-full h-full flex items-center px-4 pointer-events-none text-black/60 text-sm"
                >
                  Check in
                </label>
              )}
            </div>

            <div
              onClick={() => {
                if (!formData.checkOut) {
                  const todayStr = new Date().toISOString().split("T")[0];
                  setFormData((prev) => ({ ...prev, checkOut: todayStr }));
                }
                checkOutRef.current?.showPicker?.();
              }}
              className="w-1/2 relative bg-white rounded cursor-pointer"
            >
              <input
                ref={checkOutRef}
                type="date"
                name="checkOut"
                placeholder="Check out"
                value={formData.checkOut}
                onChange={handleDateChange}
                min={formData.checkIn || today}
                max={maxDate}
                className={`w-full py-3 px-4 placeholder-black/60 text-sm appearance-none caret-black cursor-pointer ${
                  formData.checkOut ? "text-black" : "text-transparent"
                }`}
                style={{ colorScheme: "light" }}
              />
              {!formData.checkOut && (
                <label
                  htmlFor="checkOut"
                  className="absolute top-0 left-0 w-full h-full flex items-center px-4 pointer-events-none text-black/60 text-sm"
                >
                  Check out
                </label>
              )}
            </div>
          </div>

          {/* ROOMS & GUESTS (REPLACED INPUT WITH A DIV + POPUP) */}
          <div className="mb-6 relative">
            {/* Clickable DIV instead of input */}
            <div
              onClick={() => setShowRoomsPopup(!showRoomsPopup)}
              className="w-full bg-white rounded py-3 px-4 text-left text-black text-sm cursor-pointer"
            >
              {formData.roomsAndGuests || "Rooms and Guests"}
            </div>

            {showRoomsPopup && (
              <div className="absolute z-10 w-full bg-white rounded shadow-md p-4 mt-2">
                {rooms.map((room, idx) => (
                  <div key={idx} className="mb-4 text-black">
                    <h3 className="font-bold mb-2 text-left">Room {idx + 1}</h3>
                    {/* Adults */}
                    <div className="flex justify-between items-center mb-2">
                      <span>Adults</span>
                      <div className="flex items-center space-x-4 border rounded px-2 py-1">
                        <div
                          onClick={() =>
                            handleCountChange(idx, "adults", "decrement")
                          }
                          className="px-1 text-xl cursor-pointer"
                        >
                          <IoMdRemove />
                        </div>
                        <div>{room.adults}</div>
                        <div
                          onClick={() =>
                            handleCountChange(idx, "adults", "increment")
                          }
                          className="px-1 text-xl cursor-pointer"
                        >
                          <IoMdAdd />
                        </div>
                      </div>
                    </div>
                    {/* Children */}
                    <div className="flex justify-between items-center">
                      <span>Children</span>
                      <div className="flex items-center space-x-4 border rounded px-2 py-1">
                        <div
                          onClick={() =>
                            handleCountChange(idx, "children", "decrement")
                          }
                          className="px-1 text-xl cursor-pointer"
                        >
                          <IoMdRemove />
                        </div>
                        <div>{room.children}</div>
                        <div
                          onClick={() =>
                            handleCountChange(idx, "children", "increment")
                          }
                          className="px-1 text-xl cursor-pointer"
                        >
                          <IoMdAdd />
                        </div>
                      </div>
                    </div>

                    {/* Children Ages */}
                    {room.children > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">
                          Children Ages
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {room.childrenAges.map((age, childIdx) => (
                            <div key={childIdx} className="mb-2">
                              <label className="block text-sm mb-1">
                                Child {childIdx + 1} Age
                              </label>
                              <select
                                value={age}
                                onChange={(e) =>
                                  handleChildAgeChange(
                                    idx,
                                    childIdx,
                                    e.target.value
                                  )
                                }
                                className="w-full border rounded py-1 px-2 text-sm"
                              >
                                {[...Array(13)].map((_, ageOption) => (
                                  <option key={ageOption} value={ageOption}>
                                    {ageOption}{" "}
                                    {ageOption === 0
                                      ? "Infant"
                                      : ageOption === 1
                                      ? "Year"
                                      : "Years"}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div
                  onClick={handleAddRoom}
                  className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded flex items-center gap-2 mb-4 cursor-pointer"
                >
                  Add More Room <span className="text-2xl">+</span>
                </div>

                <div
                  onClick={handleRoomsDone}
                  className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-2 rounded font-semibold cursor-pointer text-center"
                >
                  Done
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="Submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition-colors"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelSearch;