import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavSidebar from "../components/NavSidebar.jsx";
import fromlogo from "../assets/from.svg";
import tologo from "../assets/to.svg";
import { useDispatch } from "react-redux";
import { setTrainDetails } from "../redux/slices/FromToSlice.js";

export default function SearchTrains() {
const stationOptions = [
  "Ahmedabad Junction (ADI)",
  "Ambala Cantt (UMB)",
  "Amritsar Junction (ASR)",
  "Anand Vihar Terminal (ANVT)",
  "Bengaluru City Junction (SBC)",
  "Bhopal Junction (BPL)",
  "Bhubaneswar (BBS)",
  "Chandigarh (CDG)",
  "Chennai Central (MAS)",
  "Chhatrapati Shivaji Maharaj Terminus (CSMT)",
  "Danapur (DNR)",
  "Guwahati (GHY)",
  "H Nizamuddin (NZM)",
  "Hatia (HTE)",
  "Howrah Junction (HWH)",
  "Jaipur Junction (JP)",
  "Jammu Tawi (JAT)",
  "Jodhpur Junction (JU)",
  "Kacheguda (KCG)",
  "Kanpur Central (CNB)",
  "Lokmanya Tilak Terminus (LTT)",
  "Madgaon (MAO)",
  "New Delhi (NDLS)",
  "Patna Junction (PNBE)",
  "Puri (PURI)",
  "Raipur Junction (R)",
  "Rajendra Nagar Terminal (RJPB)",
  "Ranchi Junction (RNC)",
  "Secunderabad Junction (SC)",
  "Thiruvananthapuram Central (TVC)",
  "Vijayawada Junction (BZA)",
];

  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFromInputChange = (e) => {
    const value = e.target.value;
    setFromInput(value);
    setFromSuggestions(
      stationOptions.filter((station) =>
        station.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    setToInput(value);
    setToSuggestions(
      stationOptions.filter((station) =>
        station.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const selectFromSuggestion = (suggestion) => {
    setFromInput(suggestion);
    setFromSuggestions([]);
  };

  const selectToSuggestion = (suggestion) => {
    setToInput(suggestion);
    setToSuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      dispatch(setTrainDetails({ from: fromInput, to: toInput }));
      navigate("/home/trains/searchtrains/searchresults");
    } catch (error) {
      console.error("Error with search:", error);
    }
  };

  return (
    <div className="">
      <NavSidebar />
      <div className="w-full pt-20 pl-4 pr-4 md:pl-72">
        <h1 className="text-2xl font-semibold mb-2">Advanced Train Search</h1>
        <p className="text-sm mb-2">Dashboard/Trains/Search Trains</p>
        <hr className="mb-4" />
        <div className="flex flex-col md:flex-row md:space-x-2 md:px-40 justify-center mt-10 md:mt-28 space-y-4 md:space-y-0">
          {/* From Input */}
          <div className="border-2 rounded-md relative">
            <div className="bg-white h-20 w-full md:w-[300px] flex flex-col rounded-md pl-2 justify-center">
              <div className="flex items-center space-x-2">
                <img src={fromlogo} alt="From Icon" />
                <p className="font-semibold">From</p>
              </div>
              <div className="px-3 relative">
                <input
                  type="text"
                  value={fromInput}
                  onChange={handleFromInputChange}
                  placeholder="Enter Source"
                  className="placeholder:text-sm outline-none w-full"
                />
                {fromSuggestions.length > 0 && (
                  <ul className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-md max-h-48 overflow-y-auto z-10">
                    {fromSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => selectFromSuggestion(suggestion)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* To Input */}
          <div className="border-2 rounded-md relative">
            <div className="bg-white h-20 w-full md:w-[300px] flex flex-col rounded-md pl-2 justify-center">
              <div className="flex items-center space-x-2">
                <img src={tologo} alt="To Icon" />
                <p className="font-semibold">To</p>
              </div>
              <div className="px-3 relative">
                <input
                  type="text"
                  value={toInput}
                  onChange={handleToInputChange}
                  placeholder="Enter Destination"
                  className="placeholder:text-sm outline-none w-full"
                />
                {toSuggestions.length > 0 && (
                  <ul className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-md max-h-48 overflow-y-auto z-10">
                    {toSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => selectToSuggestion(suggestion)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
          >
            Search Trains
          </button>
        </div>
      </div>
    </div>
  );
}
