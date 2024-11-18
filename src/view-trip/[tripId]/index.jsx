import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacestoVisit from './components/PlacestoVisit';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null); // Initial state is null

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    const GetTripData = async () => {
        try {
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const fetchedTripData = docSnap.data();
                console.log('Fetched trip data from Firestore:', JSON.stringify(fetchedTripData, null, 2));
                setTrip(fetchedTripData);
            } else {
                console.log('No such Document');
                toast('No trip found');
            }
        } catch (error) {
            console.error('Error fetching trip data:', error);
            toast('Failed to fetch trip data');
        }
    };

    if (!trip) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            {/* Information Section */}
            <InfoSection trip={trip} />

            {/* Recommended Hotels */}
            <Hotels trip={trip} />

            {/* Daily Plan */}
            <PlacestoVisit trip={trip} />
        </div>
    );
}

export default ViewTrip;
