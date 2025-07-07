import React, { useEffect } from "react";
import { Train, XOctagon, Ticket} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stations = [
  { name: "Ahmedabad Junction", code: "ADI", state: "Gujarat" },
  { name: "Ambala Cantt", code: "UMB", state: "Haryana" },
  { name: "Amritsar Junction", code: "ASR", state: "Punjab" },
  { name: "Anand Vihar Terminal", code: "ANVT", state: "Delhi" },
  { name: "Bengaluru City Junction", code: "SBC", state: "Karnataka" },
  { name: "Bhopal Junction", code: "BPL", state: "Madhya Pradesh" },
  { name: "Bhubaneswar", code: "BBS", state: "Odisha" },
  { name: "Chandigarh", code: "CDG", state: "Chandigarh" },
  { name: "Chennai Central", code: "MAS", state: "Tamil Nadu" },
  {
    name: "Chhatrapati Shivaji Maharaj Terminus",
    code: "CSMT",
    state: "Maharashtra",
  },
  { name: "Danapur", code: "DNR", state: "Bihar" },
  { name: "Guwahati", code: "GHY", state: "Assam" },
  { name: "H Nizamuddin", code: "NZM", state: "Delhi" },
  { name: "Hatia", code: "HTE", state: "Jharkhand" },
  { name: "Howrah Junction", code: "HWH", state: "West Bengal" },
  { name: "Jaipur Junction", code: "JP", state: "Rajasthan" },
  { name: "Jammu Tawi", code: "JAT", state: "Jammu & Kashmir" },
  { name: "Jodhpur Junction", code: "JU", state: "Rajasthan" },
  { name: "Kacheguda", code: "KCG", state: "Telangana" },
  { name: "Kanpur Central", code: "CNB", state: "Uttar Pradesh" },
  { name: "Lokmanya Tilak Terminus", code: "LTT", state: "Maharashtra" },
  { name: "Madgaon", code: "MAO", state: "Goa" },
  { name: "New Delhi", code: "NDLS", state: "Delhi" },
  { name: "Patna Junction", code: "PNBE", state: "Bihar" },
  { name: "Puri", code: "PURI", state: "Odisha" },
  { name: "Raipur Junction", code: "R", state: "Chhattisgarh" },
  { name: "Rajendra Nagar Terminal", code: "RJPB", state: "Bihar" },
  { name: "Ranchi Junction", code: "RNC", state: "Jharkhand" },
  { name: "Secunderabad Junction", code: "SC", state: "Telangana" },
  { name: "Thiruvananthapuram Central", code: "TVC", state: "Kerala" },
  { name: "Vijayawada Junction", code: "BZA", state: "Andhra Pradesh" },
];

export default function HomepageContent() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 lg:ml-64 px-4 pt-20 md:px-12 md:pt-24 pb-10">
      {/* Your 3 Tiles */}
      <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
        <div onClick={() => navigate("/home/bookedtrain")} className="flex flex-1 items-center justify-between gap-3 rounded-lg p-6 bg-blue-100 hover:bg-blue-200 transition-colors cursor-pointer">
          <Train className="w-6 h-6 text-blue-600" />
          <p className="text-blue-800 text-lg font-semibold">Booked Train</p>
        </div>
        <div onClick={() => navigate("/home/canceltrain")} className="flex flex-1 items-center justify-between gap-3 rounded-lg p-6 bg-red-100 hover:bg-red-200 transition-colors cursor-pointer">
          <XOctagon className="w-6 h-6 text-red-600" />
          <p className="text-red-800 text-lg font-semibold">Cancel Train</p>
        </div>
        <div onClick={() => navigate("/home/tickets")} className="flex flex-1 items-center justify-between gap-3 rounded-lg p-6 bg-green-100 hover:bg-green-200 transition-colors cursor-pointer">
          <Ticket className="w-6 h-6 text-green-600" />
          <p className="text-green-800 text-lg font-semibold">Tickets</p>
        </div>
      </div>

      {/* Available Stations Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Available Stations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto pr-2">
          {stations.map((station) => (
            <div
              key={station.code}
              className="bg-white shadow-sm hover:shadow-md transition-shadow p-4 rounded-lg border border-gray-200"
            >
              <div className="text-xl font-semibold text-blue-700 mb-1">
                {station.name}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                Code: <span className="font-medium">{station.code}</span>
              </div>
              <div className="text-sm text-gray-600">
                State: <span className="font-medium">{station.state}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
