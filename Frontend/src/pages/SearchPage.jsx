import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavSidebar from "../components/Nav&Sidebar.jsx";
import fromlogo from "../assets/from.svg";
import tologo from "../assets/to.svg";

export default function SearchPage() {
    const stationOptions = [
        "Jodhpur Junction", "Jammu Tawi", "New Delhi", "Amritsar",
        "Secunderabad", "Kakinada Port", "Pune Junction",
        "Bangalore City Junction", "New Delhi", "Mumbai Central",
        "Lucknow", "Kolkata Howrah Junction", "Ahmedabad Junction",
        "Uttarkathani", "Jaipur Junction", "Jodhpur Junction", "Amritsar"
    ];

    const [fromInput, setFromInput] = useState('');
    const [toInput, setToInput] = useState('');
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleFromInputChange = (e) => {
        const value = e.target.value;
        setFromInput(value);
        if (value) {
            setFromSuggestions(stationOptions.filter(station => 
                station.toLowerCase().includes(value.toLowerCase())
            ));
        } else {
            setFromSuggestions([]);
        }
    };

    const handleToInputChange = (e) => {
        const value = e.target.value;
        setToInput(value);
        if (value) {
            setToSuggestions(stationOptions.filter(station => 
                station.toLowerCase().includes(value.toLowerCase())
            ));
        } else {
            setToSuggestions([]);
        }
    };

    const selectFromSuggestion = (suggestion) => {
        setFromInput(suggestion);
        setFromSuggestions([]);
    };

    const selectToSuggestion = (suggestion) => {
        setToInput(suggestion);
        setToSuggestions([]);
    };

    // Handle search button click
    const handleSearch = () => {
        if (fromInput && toInput) {
            navigate(`/home/search/search-results?from=${fromInput}&to=${toInput}`);
        } else {
            alert("Please enter both 'From' and 'To' locations.");
        }
    };


    return (
        <div className="">
            <NavSidebar />
            <div className='w-full pl-72 pt-20'>
                <h1 className="text-2xl font-semibold mb-2">Advanced Train Search</h1>
                <p className='text-sm mb-2'>Dashboard/Trains/Search Trains</p>
                <hr className="mb-4" />

                <div className="flex space-x-2 px-40 justify-center mt-28">
                    {/* From Input */}
                    <div className="border-2 rounded-md relative">
                        <div className="bg-white h-20 w-[300px] flex flex-col rounded-md pl-2 justify-center">
                            <div className="flex items-center space-x-2">
                                <div><img src={fromlogo} alt="" /></div>
                                <div><p className="font-semibold">From</p></div>
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
                        <div className="bg-white h-20 w-[300px] flex flex-col rounded-md pl-2 justify-center">
                            <div className="flex items-center space-x-2">
                                <div><img src={tologo} alt="" /></div>
                                <div><p className="font-semibold">To</p></div>
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

                    {/* Search Button */}
                    <div className="bg-[#43a64e] rounded-md h-20 font-semibold w-[100px] flex items-center justify-center">
                        <button onClick={handleSearch} className="text-center text-white">Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
