import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Train, MapPin, Clock } from "lucide-react";
import NavSidebar from "../components/NavSidebar";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

const AlternativeSearch = () => {
  const trainDetails = useSelector((state) => state.fromto);
  const user = useSelector((state) => state.auth);
  const [alternativeTrain, setAlternativeTrain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlternativeTrain = async () => {
      if (!trainDetails.from || !trainDetails.to) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.post(`${BASE_URL}/api/alternativeroute`, {
          from: trainDetails.from,
          to: trainDetails.to,
        });
        setAlternativeTrain(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAlternativeTrain();
  }, [trainDetails]);

  const isAvailable = (availability) => {
    return parseInt(availability, 10) > 0;
  };

  const handleClick = (label, price, availability) => {
    if (!isAvailable(availability)) return;

    navigate(
      "/home/trains/searchtrains/searchresults/alternatives/confirmtrain",
      {
        state: {
          train: alternativeTrain,
          selectedClass: label,
          price,
          availability,
          email: user.email,
        },
      }
    );
  };

  const renderClassCard = (label, price, availability) => {
    const available = isAvailable(availability);

    return (
      <div
        onClick={() => handleClick(label, price, availability)}
        className={`border rounded-lg p-3 ${
          available
            ? "border-gray-200 hover:border-blue-300 cursor-pointer"
            : "border-gray-300 opacity-60"
        } transition-colors`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-lg font-semibold text-gray-900">₹{price}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                available ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs font-medium">AVL {availability}</span>
          </div>
          <div className="text-xs">
            <span className={available ? "text-green-600" : "text-red-600"}>
              {available ? "Available" : "Not Available"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      <NavSidebar />
      <div className="flex-1 md:px-8 pt-16 lg:ml-72 lg:pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Alternative Trains
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <MapPin className="w-4 h-4" />
              <span>
                {trainDetails.from} → {trainDetails.to}
              </span>
            </div>
          </div>

          {loading && (
            <div className="text-gray-600 text-base font-medium">
              Loading...
            </div>
          )}

          {error && (
            <div className="text-red-600 text-base font-medium">{error}</div>
          )}

          {alternativeTrain && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 mb-4">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-xs text-gray-900">
                    {alternativeTrain.train_1.train_number}
                  </div>
                  <div className="font-semibold text-xs text-gray-900">
                    {alternativeTrain.train_1.train_name}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-xs text-gray-900">
                    {alternativeTrain.train_2.train_number}
                  </div>
                  <div className="font-semibold text-xs text-gray-900">
                    {alternativeTrain.train_2.train_name}
                  </div>
                </div>
              </div>

              {/* Middle journey info */}
              <div className="flex flex-row items-center justify-between p-4 relative">
                {/* Start Station */}
                <div className="flex flex-col items-center mb-8 md:mb-0 md:w-24">
                  <span className="text-gray-600 text-lg font-semibold mb-2">
                    {alternativeTrain.fromCode}
                  </span>
                  <Train className="text-gray-700 w-8 h-8 mb-1" />
                  <span className="text-gray-800 text-sm font-bold">
                    {alternativeTrain.train_1.start_time}
                  </span>
                </div>

                {/* Duration line 1 */}
                <div className="flex flex-col items-center mx-2 md:w-32">
                  <div className="border-t border-dashed border-gray-400 w-full mb-1"></div>
                  <span className="text-gray-600 text-xs">
                    {alternativeTrain.train_1.duration}
                  </span>
                </div>

                {/* Midpoint */}
                <div className="flex flex-col items-center relative mb-8 md:mb-0 md:w-40">
                  <span className="text-gray-600 text-lg font-semibold mb-2">
                    {alternativeTrain.intermediatecode}
                  </span>
                  <div className="relative w-16 h-12 flex justify-center items-center mb-2">
                    <svg
                      className="absolute top-0 left-0 w-full h-full"
                      viewBox="0 0 80 40"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,20 C20,0 60,40 80,20"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                        fill="none"
                      />
                    </svg>
                    <Train className="text-gray-700 w-8 h-8 z-10 bg-white rounded-full" />
                  </div>
                  <span className="text-gray-800 text-sm font-bold">
                    {alternativeTrain.train_1.end_time}
                  </span>
                  <span className="text-gray-800 text-sm font-bold">
                    {alternativeTrain.train_2.start_time}
                  </span>
                  <div className="absolute -bottom-8 md:-bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs whitespace-nowrap">
                    Wait Time - {alternativeTrain.wait_time}
                  </div>
                </div>

                {/* Duration line 2 */}
                <div className="flex flex-col items-center mx-2 md:w-32">
                  <div className="border-t border-dashed border-gray-400 w-full mb-1"></div>
                  <span className="text-gray-600 text-xs">
                    {alternativeTrain.train_2.duration}
                  </span>
                </div>

                {/* End Station */}
                <div className="flex flex-col items-center md:w-24">
                  <span className="text-gray-600 text-lg font-semibold mb-2">
                    {alternativeTrain.toCode}
                  </span>
                  <Train className="text-gray-700 w-8 h-8 mb-1" />
                  <span className="text-gray-800 text-sm font-bold">
                    {alternativeTrain.train_2.end_time}
                  </span>
                </div>
              </div>

              {/* Total Duration */}
              <div className="flex justify-center pb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {alternativeTrain.total_duration}
                  </span>
                </div>
              </div>

              {/* Class Options */}
              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {renderClassCard(
                    "3A",
                    alternativeTrain.combined_fare.thirdClass,
                    alternativeTrain.availability.thirdClass
                  )}
                  {renderClassCard(
                    "Sleeper",
                    alternativeTrain.combined_fare.sleeper,
                    alternativeTrain.availability.sleeper
                  )}
                  {renderClassCard(
                    "2A",
                    alternativeTrain.combined_fare.secondClass,
                    alternativeTrain.availability.secondClass
                  )}
                  {renderClassCard(
                    "1A",
                    alternativeTrain.combined_fare.firstClass,
                    alternativeTrain.availability.firstClass
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlternativeSearch;
