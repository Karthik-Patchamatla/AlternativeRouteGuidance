import React, { useEffect, useState } from 'react';
import NavSidebar from '../components/NavSidebar';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';

export default function BookedTrain() {
  const user = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [alternativeBookings, setAlternativeBookings] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/api/bookedtrain`, {
          email: user.email,
        });

        setBookings(res.data.bookings);
        setAlternativeBookings(res.data.alternativeBookings);
      } catch (err) {
        console.log("error fetching bookings", err);
      }
    };

    if (user?.email) {
      fetchBooking();
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavSidebar />

      <div className="flex-1 lg:ml-64 px-4 pt-20 md:px-12 md:pt-24 pb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          <i>My Train Bookings</i>
        </h1>

        {/* Regular Bookings */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Booked Trains
          </h2>

          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((b, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      {b.train_number} - {b.train_name}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {b.selected_class}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    <strong>Route:</strong> {b.from} → {b.to}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Timing:</strong> {b.start_time} → {b.arrival_time}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Duration:</strong> {b.duration}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Seats Booked:</strong> {b.number_of_tickets}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Total Price:</strong> ₹{b.total_price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Alternative Bookings */}
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Alternative Bookings
          </h2>

          {alternativeBookings.length === 0 ? (
            <p className="text-gray-600">No alternative bookings found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alternativeBookings.map((a, i) => (
                <div
                  key={i}
                  className="bg-green-50 border border-green-200 rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    {a.from} → {a.to}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Intermediate Stop:</strong> {a.intermediate_station}
                  </p>

                  <div className="mb-2">
                    <p className="text-green-700 font-semibold">Train 1:</p>
                    <p className="text-gray-700 text-sm">
                      {a.train_number_1} - {a.train_name_1}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {a.start_time_1} → {a.end_time_1}
                    </p>
                    <p className="text-gray-700 text-sm">
                      Duration: {a.duration_1}
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="text-green-700 font-semibold">Train 2:</p>
                    <p className="text-gray-700 text-sm">
                      {a.train_number_2} - {a.train_name_2}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {a.start_time_2} → {a.end_time_2}
                    </p>
                    <p className="text-gray-700 text-sm">
                      Duration: {a.duration_2}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Wait Time:</strong> {a.wait_time}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Total Duration:</strong> {a.total_duration}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {a.selected_class}
                    </span>
                    <span className="text-gray-700 text-sm">
                      ₹{a.total_price} ({a.number_of_tickets} seats)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
