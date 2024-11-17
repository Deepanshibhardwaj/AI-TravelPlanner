import React from 'react';

function Hotels({ trip }) {
    console.log('Full trip object:', trip); // Log the entire trip object to debug

    // Safely access hotels array from trip data, fallback to an empty array if not found
    const hotels = trip?.tripData?.hotels || []; 

    // If no hotels are available, display a message
    if (hotels.length === 0) {
        console.log('No hotels available for this trip.');
        return <div>No hotels available for this trip.</div>;
    }

    return (
        <div>
            <h2 className="font-bold text-white text-2xl mt-5">Hotel Recommendations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hotels.map((hotel, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                        {/* Fallback image if no image_url is provided */}
                        <img
                            src={hotel.image_url || '/hotel1.jpg'} 
                            alt={hotel.name || 'Hotel Image'}  // Fallback alt text
                            className="rounded-xl w-full h-32 object-cover"
                        />
                        <div className="my-2">
                            <h2 className="font-medium text-white">
                                {hotel.name || 'Unnamed Hotel'}  {/* Fallback name if not available */}
                            </h2>
                            <p className="text-gray-400">{hotel.address || 'Address not available'}</p> {/* Fallback address */}
                            <p className="text-sm text-green-500">{hotel.price || 'Price not available'}</p> {/* Fallback price */}
                            <p className="text-sm text-yellow-500">
                                Rating: {hotel.rating ? hotel.rating : 'No rating available'} {/* Fallback rating */}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hotels;
