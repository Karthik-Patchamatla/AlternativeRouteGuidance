import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

export default function ConfirmTrain() {
  const location = useLocation();
  const navigate = useNavigate();
  const train = location.state?.train;
  const selectedClass = location.state?.selectedClass;
  const price = parseInt(location.state?.price, 10);
  const maxAvailability = parseInt(location.state?.availability, 10) || 0;
  const email = location.state?.userEmail;

  const [ticketCount, setTicketCount] = useState(1);
  const totalPrice = ticketCount * price;

  const handleIncrement = () => {
    if (ticketCount < maxAvailability) {
      setTicketCount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount((prev) => prev - 1);
    }
  };

  if (!train || !selectedClass) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600">
          No train data available.
        </h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleProceedToPayment = async () => {
    try {
      const bookingData = {
        train_id: train._id,
        train_number: train.train_number,
        train_name: train.train_name,
        from: train.from,
        to: train.to,
        start_time: train.start_time,
        arrival_time: train.arrival_time,
        duration: train.duration,
        selected_class: selectedClass,
        number_of_tickets: ticketCount,
        price_per_ticket: price,
        total_price: totalPrice,
        email: email,
      };

      const response = await axios.post(
        `${BASE_URL}/api/bookings`,
        bookingData
      );

      alert("Booking successful!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.error) {
        alert(`Booking failed: ${error.response.data.error}`);
      } else {
        alert("Booking failed. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Confirm Train Booking</h1>
      <div className="border border-gray-300 rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {train.train_number} - {train.train_name}
        </h2>
        <p>
          <strong>From:</strong> {train.from}
        </p>
        <p>
          <strong>To:</strong> {train.to}
        </p>
        <p>
          <strong>Departure:</strong> {train.start_time}
        </p>
        <p>
          <strong>Arrival:</strong> {train.arrival_time}
        </p>
        <p>
          <strong>Duration:</strong> {train.duration}
        </p>
      </div>

      <div className="border border-gray-300 rounded p-4">
        <h3 className="text-lg font-semibold mb-2">
          Selected Class: {selectedClass}
        </h3>
        <p>
          <strong>Price per ticket:</strong> ₹{price}
        </p>
        <p>
          <strong>Availability:</strong> {maxAvailability}
        </p>
        <p>
          <strong>User Email:</strong> {email}
        </p>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center space-x-4">
            <span className="font-medium">Number of Tickets:</span>
            <button
              onClick={handleDecrement}
              className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="w-8 text-center">{ticketCount}</span>
            <button
              onClick={handleIncrement}
              className={`w-8 h-8 rounded ${
                ticketCount < maxAvailability
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
              disabled={ticketCount >= maxAvailability}
            >
              +
            </button>
          </div>

          <p className="text-lg font-semibold">Total Price: ₹{totalPrice}</p>
        </div>
      </div>

      <button
        onClick={handleProceedToPayment}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
