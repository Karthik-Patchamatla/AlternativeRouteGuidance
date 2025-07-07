import React, { useEffect, useState } from 'react';
import NavSidebar from '../components/NavSidebar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../config';
import jsPDF from 'jspdf';

export default function Tickets() {
  const user = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [alternativeBookings, setAlternativeBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/api/bookedtrain`, {
          email: user.email,
        });
        setBookings(res.data.bookings);
        setAlternativeBookings(res.data.alternativeBookings);
      } catch (err) {
        console.log('Error fetching bookings', err);
      }
    };

    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email]);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Train Ticket', 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${user.firstName} ${user.lastName}`, 20, 35);
    doc.text(`Email: ${user.email}`, 20, 45);
    doc.text(`Mobile: ${user.mobileNumber}`, 20, 55);

    let y = 70;

    // Regular bookings
    if (bookings.length > 0) {
      bookings.forEach((b, i) => {
        doc.setFontSize(14);
        doc.text(`Train #${i + 1}`, 20, y);
        y += 10;
        doc.setFontSize(12);
        doc.text(`Train Number: ${b.train_number}`, 20, y); y += 7;
        doc.text(`Train Name: ${b.train_name}`, 20, y); y += 7;
        doc.text(`From: ${b.from}`, 20, y); y += 7;
        doc.text(`To: ${b.to}`, 20, y); y += 7;
        doc.text(`Start Time: ${b.start_time}`, 20, y); y += 7;
        doc.text(`Arrival Time: ${b.arrival_time}`, 20, y); y += 7;
        doc.text(`Duration: ${b.duration}`, 20, y); y += 7;
        doc.text(`Class: ${b.selected_class}`, 20, y); y += 7;
        doc.text(`Seats: ${b.number_of_tickets}`, 20, y); y += 7;
        doc.text(`Total Price: ₹${b.total_price}`, 20, y); y += 15;
      });
    } else {
      doc.text('No regular bookings found.', 20, y);
      y += 10;
    }

    // Alternative bookings
    if (alternativeBookings.length > 0) {
      doc.setFontSize(16);
      doc.text('Alternative Train Bookings', 20, y);
      y += 10;

      alternativeBookings.forEach((a, i) => {
        doc.setFontSize(14);
        doc.text(`Alt Train #${i + 1}`, 20, y);
        y += 10;
        doc.setFontSize(12);
        doc.text(`From: ${a.from} → ${a.to}`, 20, y); y += 7;
        doc.text(`Via: ${a.intermediate_station}`, 20, y); y += 7;
        doc.text(`Train 1: ${a.train_number_1} - ${a.train_name_1}`, 20, y); y += 7;
        doc.text(`  ${a.start_time_1} → ${a.end_time_1} (${a.duration_1})`, 20, y); y += 7;
        doc.text(`Train 2: ${a.train_number_2} - ${a.train_name_2}`, 20, y); y += 7;
        doc.text(`  ${a.start_time_2} → ${a.end_time_2} (${a.duration_2})`, 20, y); y += 7;
        doc.text(`Wait Time: ${a.wait_time}`, 20, y); y += 7;
        doc.text(`Total Duration: ${a.total_duration}`, 20, y); y += 7;
        doc.text(`Class: ${a.selected_class}`, 20, y); y += 7;
        doc.text(`Seats: ${a.number_of_tickets}`, 20, y); y += 7;
        doc.text(`Total Price: ₹${a.total_price}`, 20, y); y += 15;
      });
    } else {
      doc.text('No alternative bookings found.', 20, y);
    }

    doc.save('Train_Ticket.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavSidebar />

      <div className="flex-1 lg:ml-64 px-4 pt-20 md:px-12 md:pt-24 pb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Official Train Ticket
        </h1>

        <div className="bg-white border border-gray-300 rounded-lg shadow p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Passenger Details</h2>
          <div className="space-y-2 text-gray-800">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobileNumber}</p>
          </div>

          {/* Regular Bookings */}
          <hr className="my-6"/>
          <h2 className="text-xl font-bold mb-4 text-gray-700">Booked Trains</h2>

          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((b, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded p-4 bg-gray-100"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Train #{i + 1}
                  </h3>
                  <p><strong>Train Number:</strong> {b.train_number}</p>
                  <p><strong>Train Name:</strong> {b.train_name}</p>
                  <p><strong>From:</strong> {b.from}</p>
                  <p><strong>To:</strong> {b.to}</p>
                  <p><strong>Start Time:</strong> {b.start_time}</p>
                  <p><strong>Arrival Time:</strong> {b.arrival_time}</p>
                  <p><strong>Duration:</strong> {b.duration}</p>
                  <p><strong>Class:</strong> {b.selected_class}</p>
                  <p><strong>Seats:</strong> {b.number_of_tickets}</p>
                  <p><strong>Total Price:</strong> ₹{b.total_price}</p>
                </div>
              ))}
            </div>
          )}

          {/* Alternative Bookings */}
          <hr className="my-6"/>
          <h2 className="text-xl font-bold mb-4 text-gray-700">Alternative Train Bookings</h2>

          {alternativeBookings.length === 0 ? (
            <p className="text-gray-600">No alternative bookings found.</p>
          ) : (
            <div className="space-y-4">
              {alternativeBookings.map((a, i) => (
                <div
                  key={i}
                  className="border border-green-300 bg-green-50 rounded p-4"
                >
                  <h3 className="text-lg font-semibold mb-2 text-green-800">
                    Alternative Train #{i + 1}
                  </h3>
                  <p><strong>From:</strong> {a.from}</p>
                  <p><strong>To:</strong> {a.to}</p>
                  <p><strong>Via:</strong> {a.intermediate_station}</p>
                  <div className="mt-2">
                    <p className="font-semibold text-green-700">Train 1:</p>
                    <p>{a.train_number_1} - {a.train_name_1}</p>
                    <p>{a.start_time_1} → {a.end_time_1} ({a.duration_1})</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold text-green-700">Train 2:</p>
                    <p>{a.train_number_2} - {a.train_name_2}</p>
                    <p>{a.start_time_2} → {a.end_time_2} ({a.duration_2})</p>
                  </div>
                  <p><strong>Wait Time:</strong> {a.wait_time}</p>
                  <p><strong>Total Duration:</strong> {a.total_duration}</p>
                  <p><strong>Class:</strong> {a.selected_class}</p>
                  <p><strong>Seats:</strong> {a.number_of_tickets}</p>
                  <p><strong>Total Price:</strong> ₹{a.total_price}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-right">
            <button
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow"
            >
              Print Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
