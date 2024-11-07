import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchResultsPage() {
    const location = useLocation();
    const [trains, setTrains] = useState([]);
    const params = new URLSearchParams(location.search);
    const from = params.get("from");
    const to = params.get("to");

    useEffect(() => {
        axios.get(`/api/getTrainsByRoute?from=${from}&to=${to}`)
            .then(response => setTrains(response.data))
            .catch(error => console.error("Error fetching train data:", error));
    }, [from, to]);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-semibold mb-4">Available Trains</h1>
            {trains.length ? trains.map((train, index) => (
                <div key={index} className="border rounded-md p-4 mb-4">
                    <h2 className="text-lg font-bold">{train.trainname}</h2>
                    <p>Departure: {train.departure}</p>
                    <p>Arrival: {train.arrival}</p>
                    <p>Duration: {train.duration}</p>
                    <p>From: {train.from}</p>
                    <p>To: {train.to}</p>
                </div>
            )) : <p>No trains found for the selected route.</p>}
        </div>
    );
}

export default SearchResultsPage;
