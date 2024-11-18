import React from 'react';
import HotelCardItem from './HotelCardItem';

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
          <HotelCardItem key={index} hotel={hotel} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
