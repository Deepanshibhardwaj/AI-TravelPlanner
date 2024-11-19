import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (hotel) {
            GetPlacePhoto();
        }
    }, [hotel]);

    const GetPlacePhoto = async () => {
        try {
            const data = {
                textQuery: hotel?.name,
            };
            const result = await GetPlaceDetails(data);
            const photoData = result.data.places[0]?.photos?.[3]?.name;
            if (photoData) {
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoData);
                setPhotoUrl(PhotoUrl);
            }
        } catch (error) {
            console.error('Error fetching photo:', error);
        }
    };

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name || '')}+${encodeURIComponent(hotel.address || '')}`}
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // Security best practice for external links
            className="bg-blue-900 p-4 rounded-lg hover:scale-110 transition-all cursor-pointer"
        >
            {/* Updated to use room.jpg as the fallback image */}
            <img
                src={photoUrl || '/room.jpg'}
                alt={hotel.name || 'Hotel'}
                className="rounded-xl h-[180px] w-full object-cover"
            />
            <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium text-white">{hotel.name || 'Unnamed Hotel'}</h2>
                <p className="text-xs text-white">{hotel.address || 'Address not available'}</p>
                <p className="text-sm text-green-500">{hotel.price || 'Price not available'}</p>
                <p className="text-sm text-yellow-500">
                    Rating: ⭐{hotel.rating ? hotel.rating : 'No rating available'}
                </p>
            </div>
        </Link>
    );
}

export default HotelCardItem;
