import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, MapPin } from 'lucide-react';
import NavSidebar from '../components/NavSidebar';
import { BASE_URL } from '../config';

const TrainCard = ({ train }) => {
  const navigate = useNavigate();

  const isAvailable = (availability) => {
    return parseInt(availability, 10) > 0;
  };

  const handleClassClick = (clsName, price, availability) => {
    const availableCount = parseInt(availability, 10) || 0;

    if (availableCount === 0) {
      alert("No tickets left!");
      return;
    }

    navigate('/home/trains/searchtrains/searchresults/confirmtrain', {
      state: {
        train,
        selectedClass: clsName,
        price,
        availability
      }
    });
  };

  const renderClassCard = (label, price, availability) => {
    const available = isAvailable(availability);

    return (
      <div
        onClick={() => handleClassClick(label, price, availability)}
        className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-lg font-semibold text-gray-900">₹{price}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                available ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></div>
            <span className="text-xs font-medium">
              AVL {availability}
            </span>
          </div>
          <div className="text-xs">
            <span className={available ? 'text-green-600' : 'text-red-600'}>
              {available ? 'Available' : 'Not Available'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-lg text-gray-900">
            {train.train_number} {train.train_name}
          </h3>
        </div>
      </div>

      {/* Time and Duration */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {train.start_time} {train.from}
              </div>
            </div>

            <div className="flex items-center space-x-2 px-3">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{train.duration}</span>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {train.arrival_time} {train.to}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Class Options */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {renderClassCard("3A", train["3A_price"], train["3A_availability"])}
          {renderClassCard("Sleeper", train.sleeper_price, train.sleeper_availability)}
          {renderClassCard("2A", train["2A_price"], train["2A_availability"])}
          {renderClassCard("1A", train["1A_price"], train["1A_availability"])}
        </div>
      </div>
    </div>
  );
};

export default function SearchResults() {
  const trainDetails = useSelector((state) => state.fromto);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTrains = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/api/searchtrains`, {
        from: trainDetails.from,
        to: trainDetails.to,
      });
      setSearchResults(response.data);
    } catch (err) {
      console.error('Search error:', err);
      if (err.response?.status === 404) {
        setError('No trains found for the specified route.');
        setSearchResults([]);
      } else {
        setError('Failed to fetch search results. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trainDetails.from && trainDetails.to) {
      searchTrains();
    }
  }, [trainDetails.from, trainDetails.to]);

  return (
    <div className="flex">
      <NavSidebar />
      <div className="flex-1 md:px-8 pt-16 lg:ml-72 lg:pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Train Search Results
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <MapPin className="w-4 h-4" />
              <span>
                {trainDetails.from} → {trainDetails.to}
              </span>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Searching for trains...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {!loading && !error && searchResults.length > 0 && (
            <div className="space-y-4">
              {searchResults.map((train, index) => (
                <TrainCard key={train._id || index} train={train} />
              ))}
            </div>
          )}

          {!loading && !error && searchResults.length === 0 && trainDetails.from && trainDetails.to && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">
                  No trains found for the selected route.
                </p>
                <p className="text-sm mt-2">
                  Try searching for a different route or date.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
