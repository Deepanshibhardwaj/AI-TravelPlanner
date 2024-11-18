import React from 'react';
import { Link } from 'react-router-dom';
import { LuMapPin } from "react-icons/lu";
import { Button } from '@/components/ui/button';

function PlaceCardItem({ place }) {
    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
        >
            <div className="rounded-xl mt-2 p-3 flex gap-5 hover:scale-105 transition-transform  shadow-md">
                {/* Image */}
                <img
                    src="/hotel.jpg"
                    alt={place.name || "Place image"}
                    className="w-[130px] h-[130px] rounded-xl object-cover"
                />
                {/* Place Details */}
                <div>
                    <h2 className="font-bold text-lg text-white">{place.name}</h2>
                    <p className="text-sm text-gray-400 font-serif mt-1">{place.details}</p>
                    <Button><LuMapPin /></Button>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
