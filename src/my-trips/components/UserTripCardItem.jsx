import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const result = await GetPlaceDetails(data);
      const photoName = result?.data?.places[0]?.photos[3]?.name;
      if (photoName) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        console.error('Photo not found for the location.');
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`} className="block">
      <div className="hover:scale-105 transform transition-all duration-300 ease-in-out shadow-md rounded-lg overflow-hidden bg-white">
        <img
          src={photoUrl ? photoUrl : '/hotel1.jpg'}
          alt={trip?.userSelection?.location?.label || 'Trip Image'}
          className="object-cover h-52 w-full"
        />
        <div className="p-4">
          <h2 className="font-bold text-lg text-gray-800 truncate">
            {trip?.userSelection?.location?.label || 'Unknown Location'}
          </h2>
          <p className="text-sm text-gray-600">
            {trip?.userSelection?.noofdays || 0} Days trip with{' '}
            {trip?.userSelection?.budget || 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
