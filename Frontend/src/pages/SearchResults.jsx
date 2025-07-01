import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, MapPin } from 'lucide-react';
import NavSidebar from '../components/NavSidebar';
import { BASE_URL } from '../config';

const TrainCard = ({ train }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50';
      case 'tatkal': return 'text-orange-600 bg-orange-50';
      case 'waiting': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleClassClick = (clsName, price, availability) => {
    navigate('/home/trains/searchtrains/searchresults/confirmtrain', {
      state: {
        train,
        selectedClass: clsName,
        price,
        availability
      }
    });
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
          
          {/* 3A Class */}
          <div
            onClick={() => handleClassClick("3A", train["3A_price"], train["3A_availability"])}
            className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">3A</span>
              <span className="text-lg font-semibold text-gray-900">₹{train["3A_price"]}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  train.availability?.['3A']?.status === 'waiting'
                    ? 'bg-red-500'
                    : train.availability?.['3A']?.status === 'tatkal'
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                }`}></div>
                <span className="text-xs font-medium">
                  {train.availability?.['3A']?.status === 'waiting' ? 'WL' : 'AVL'} {train["3A_availability"]}
                </span>
              </div>
              <div className="text-xs">
                {train.availability?.['3A']?.status === 'tatkal' && (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor('tatkal')}`}>
                    Tatkal
                  </span>
                )}
                {train.availability?.['3A']?.status === 'waiting' && (
                  <span className="text-red-600">Waiting List</span>
                )}
                {(!train.availability?.['3A']?.status || train.availability?.['3A']?.status === 'available') && (
                  <span className="text-green-600">Available</span>
                )}
              </div>
            </div>
          </div>

          {/* Sleeper Class */}
          <div
            onClick={() => handleClassClick("Sleeper", train.sleeper_price, train.sleeper_availability)}
            className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">SL</span>
              <span className="text-lg font-semibold text-gray-900">₹{train.sleeper_price}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  train.availability?.sleeper?.status === 'waiting'
                    ? 'bg-red-500'
                    : 'bg-green-500'
                }`}></div>
                <span className="text-xs font-medium">
                  {train.availability?.sleeper?.status === 'waiting' ? 'WL' : 'AVL'} {train.sleeper_availability}
                </span>
              </div>
              <div className="text-xs text-green-600">
                {train.availability?.sleeper?.status === 'waiting' ? 'Waiting List' : 'Available'}
              </div>
            </div>
          </div>

          {/* 2A Class */}
          <div
            onClick={() => handleClassClick("2A", train["2A_price"], train["2A_availability"])}
            className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">2A</span>
              <span className="text-lg font-semibold text-gray-900">₹{train["2A_price"]}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  train.availability?.['2A']?.status === 'waiting'
                    ? 'bg-red-500'
                    : 'bg-green-500'
                }`}></div>
                <span className="text-xs font-medium">
                  {train.availability?.['2A']?.status === 'waiting' ? 'WL' : 'AVL'} {train["2A_availability"]}
                </span>
              </div>
              <div className="text-xs text-green-600">
                {train.availability?.['2A']?.status === 'waiting'
                  ? 'Waiting List'
                  : 'Available'}
              </div>
            </div>
          </div>

          {/* 1A Class */}
          <div
            onClick={() => handleClassClick("1A", train["1A_price"], train["1A_availability"])}
            className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">1A</span>
              <span className="text-lg font-semibold text-gray-900">₹{train["1A_price"]}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  train.availability?.['1A']?.status === 'waiting'
                    ? 'bg-red-500'
                    : train.availability?.['1A']?.available < 10
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}></div>
                <span className="text-xs font-medium">
                  {train.availability?.['1A']?.status === 'waiting' ? 'WL' : 'AVL'} {train["1A_availability"]}
                </span>
              </div>
              <div className="text-xs">
                {train.availability?.['1A']?.status === 'waiting' ? (
                  <span className="text-red-600">Waiting List</span>
                ) : train.availability?.['1A']?.available < 10 ? (
                  <span className="text-orange-600">Limited</span>
                ) : (
                  <span className="text-green-600">Available</span>
                )}
              </div>
            </div>
          </div>
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
    if (!trainDetails.from || !trainDetails.to) {
      setError('Please provide both from and to locations');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/api/searchtrains`, {
        from: trainDetails.from,
        to: trainDetails.to,
      });

      console.log("Train Search Response:", response.data);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Train Search Results</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{trainDetails.from} → {trainDetails.to}</span>
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
                <p className="text-lg">No trains found for the selected route.</p>
                <p className="text-sm mt-2">Try searching for a different route or date.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
