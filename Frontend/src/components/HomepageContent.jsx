import React, { useEffect, useState } from 'react';

export default function HomepageContent() {
  const [trains, setTrains] = useState([]);

  // Fetch train details from the database (API call)
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/getTrains'); // Updated to include the server URL
        const data = await response.json();
        console.log('Train data:', data); // Log the data to the console
        setTrains(data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div className="flex-1 ml-64 pt-20 bg-[#f3f3f3] p-6">
      <div className="flex space-x-10 text-[#3366cc] text-lg mb-6">
        <div className="cursor-pointer bg-white h-28 w-full shadow-md rounded-lg flex items-center justify-around">
          <div>
            <i className="fa-solid fa-train"></i>
          </div>

          <div>
            <p>Booked Trains</p>
          </div>
        </div>

        <div className="cursor-pointer bg-white h-28 w-full shadow-md rounded-lg flex items-center justify-around">
          <div>
            <i className="fa-solid fa-ban"></i>
          </div>
          <div>
            <p>Cancel Booking</p>
          </div>
        </div>

        <div className="cursor-pointer bg-white h-28 w-full shadow-md rounded-lg flex items-center justify-around">
          <div>
            <i className="fa-solid fa-ticket"></i>
          </div>
          <div>
            <p>Tickets</p>
          </div>
        </div>
      </div>

      {/* Available Trains Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Trains</h2>
        <div className="px-32 flex flex-col space-y-6">
          {trains.length === 0 ? (
            <p>No trains available</p>
          ) : (
            trains.map((train) => (
              <div key={train.trainnumber} className="w-full bg-white p-6 rounded-lg">
                    <div className="mb-6">
                        <div className='flex space-x-3 justify-center text-2xl font-bold'>
                            <div>{train.from}</div>
                            <div><i className="fa-solid fa-arrow-right"></i></div>
                            <div>{train.to}</div>
                        </div>
                    </div>
                    <div className='ml-14'>
                        <div className='text-lg font-medium'>
                            <p>{train.trainnumber} - {train.trainname}</p>
                        </div>
                        <div className='text-sm'>
                            <p>{train.arrival} {train.from} -- {train.duration} -- {train.departure} {train.to}</p>
                        </div>
                    </div>
                    <div className="flex space-x-7 justify-center mt-8">
                        <div className='bg-[#f3f3f3] w-40 px-4 py-2 text-xs font-medium text-center'>
                            <p>Sleeper - SL</p>
                            <p>{train.sleeper}</p>
                        </div>
                        <div className='bg-[#f3f3f3] w-40 px-4 py-2 text-xs font-medium text-center'>
                            <p>I Class - 1A</p>
                            <p>{train.firstclass}</p>
                        </div>
                        <div className='bg-[#f3f3f3] w-40 px-4 py-2 text-xs font-medium text-center'>
                            <p>II Class - 2A</p>
                            <p>{train.secondclass}</p>
                        </div>
                        <div className='bg-[#f3f3f3] w-40 px-4 py-2 text-xs font-medium text-center'>
                            <p>II Class - 3A</p>
                            <p>{train.thirdclass}</p>
                        </div>
                    </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
