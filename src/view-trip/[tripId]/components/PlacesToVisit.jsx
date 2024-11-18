import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacestoVisit({ trip }) {
    const Places = trip?.tripData?.trip?.itinerary || []; // Safely access the itinerary data

    return (
        <div>
            <h2 className="font-bold text-3xl mt-10 ">Places to visit</h2>
            <div>
                {Places.map((item, index) => (
                    <div key={index} className="my-8">
                        <h2 className=" font-extrabold text-xl mb-4">Day {item.day}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {item.activities?.map((place, placeIndex) => (
                                <div key={placeIndex} className="border border-blue-700 p-3 rounded-lg">
                                    <h2 className="text-blue-800 font-bold text-sm mb-2">{place.time}</h2>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacestoVisit;
