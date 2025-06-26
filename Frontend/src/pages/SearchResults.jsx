import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NavSidebar from '../components/NavSidebar';

export default function SearchResults() {
  const trainDetails = useSelector((state) => state.fromto);
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
        params: {
          fromStationCode: trainDetails.from,
          toStationCode: trainDetails.to,
          dateOfJourney: '2025-06-27',
        },
        headers: {
          'x-rapidapi-key': '6deaa1c31dmsh87b2361ce8c24aep14f3bajsn8bcdf9c49eae',
          'x-rapidapi-host': 'irctc1.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setTrains(response.data.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching train data:", error);
        setError("Unable to fetch train data.");
        setTrains([]);
      }
    };

    if (trainDetails.from && trainDetails.to) {
      fetchTrains();
    }
  }, [trainDetails]);

  const getFormattedDate = () => {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderTrainCard = (train, index) => (
    <div
      key={index}
      className="bg-white mb-8 mt-8 border shadow rounded-xl p-6 md:p-10 flex justify-center w-full max-w-5xl mx-auto"
    >
      <div className='flex flex-col space-y-5 w-full'>
        <div className='flex flex-col md:flex-row md:space-x-2 font-medium justify-center text-center'>
          <div>{train.train_number}</div>
          <div className='hidden md:block'>-</div>
          <div>{train.train_name}</div>
        </div>

        <div className='flex flex-wrap justify-center gap-4 text-center'>
          <div>{train.from_std}</div>
          <div>{train.from_station_name}</div>
          <div>--</div>
          <div>{train.duration}</div>
          <div>--</div>
          <div>{train.to_std}</div>
          <div>{train.to_station_name}</div>
        </div>

        <div className='flex flex-wrap justify-center gap-4'>
          {train.class_type?.map((classCode, idx) => (
            <div
              key={idx}
              className='bg-[#f3f3f3] w-24 sm:w-28 font-semibold p-2 rounded-lg text-center text-sm'
            >
              <div>{classCode}</div>
              <div>₹ --</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const dummyTrain = {
    train_number: '12345',
    train_name: 'Sample Express',
    from_std: '10:00',
    from_station_name: 'Sample From',
    to_std: '18:00',
    to_station_name: 'Sample To',
    duration: '08:00',
    class_type: ['SL', '3A', '2A', '1A'],
  };

  return (
    <div className="pt-20">
      <NavSidebar />
      <div className="px-4 md:pl-72">
        <h1 className="text-2xl font-semibold mb-2">Advanced Train Search</h1>
        <p className='text-sm'>Dashboard / Trains / Search Trains</p>

        <div className='bg-[#f3f3f3] mt-10 md:mt-20 flex flex-wrap justify-between items-center px-4 py-4 rounded-md max-w-5xl mx-auto'>
          <div className='flex items-center space-x-3 text-lg font-semibold'>
            <div>{trainDetails.from}</div>
            <div><i className="fa-solid fa-arrow-right" style={{ color: '#63E6BE' }}></i></div>
            <div>{trainDetails.to}</div>
          </div>
          <div className="text-sm mt-2 md:mt-0">{getFormattedDate()}</div>
        </div>

        {trains.length > 0 ? (
          trains.map((train, index) => renderTrainCard(train, index))
        ) : error ? (
          renderTrainCard(dummyTrain, 'dummy')
        ) : (
          <p className="text-center mt-10">Loading train data...</p>
        )}
      </div>
    </div>
  );
}