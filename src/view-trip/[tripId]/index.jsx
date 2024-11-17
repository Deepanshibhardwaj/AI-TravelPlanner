import Hotels from '@/components/Hotels';
import InfoSection from '@/components/InfoSection';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Hotel } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null); // Set the initial state as null instead of an empty array

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const tripData = docSnap.data();
      console.log('Document:', tripData);
      setTrip(tripData); // Update the state with the fetched trip data
    } else {
      console.log('No such Document');
      toast('No trip Found');
    }
  };

  // Check if trip data is still loading
  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip}/>

      {/* Daily Plan */}

      {/* Footer */}
    </div>
  );
}

export default Viewtrip;
