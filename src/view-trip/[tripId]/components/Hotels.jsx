import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
    console.log('Full trip object:', trip); // Log the entire trip object for debugging

    // Safely access hotels array from trip data, fallback to an empty array if not found
    const hotels = trip?.tripData?.trip?.hotels || [];

    // If no hotels are available, display a message
    if (hotels.length === 0) {
        console.log('No hotels available for this trip.');
        return <div>No hotels available for this trip.</div>;
    }

    return (
        <div>
            <h2 className="font-bold text-white text-3xl mt-10 mb-5">Hotel Recommendations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {hotels.map((hotel, index) => (
                    <Link
                        key={index}
                        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name || '')}+${encodeURIComponent(hotel.address || '')}`}
                        target="_blank" // Opens the link in a new tab
                        rel="noopener noreferrer" // Security best practice for external links
                        className="bg-blue-900 p-4 rounded-lg hover:scale-110 transition-all cursor-pointer"
                    >
                        <img src="/hotel1.jpg" alt="Hotel" className="rounded-xl" />
                        <div className="my-2 flex flex-col gap-2">
                            <h2 className="font-medium text-white">{hotel.name || 'Unnamed Hotel'}</h2>
                            <p className="text-xs text-white">{hotel.address || 'Address not available'}</p>
                            <p className="text-sm text-green-500">{hotel.price || 'Price not available'}</p>
                            <p className="text-sm text-yellow-500">
                                Rating: ⭐{hotel.rating ? hotel.rating : 'No rating available'}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Hotels;
