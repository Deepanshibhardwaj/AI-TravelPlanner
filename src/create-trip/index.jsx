import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { AI_Prompt, SelectBudgetOptions, SelectTravelersList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setDoc, doc } from 'firebase/firestore';

import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.log(error);
      // Handle error on login
    }
  });

  const OnGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Trigger login if user is not logged in
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData.traveler) {
      setOpenDialog(true);
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_Prompt
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noofdays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noofdays);


    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())

  }


  const SaveAiTrip = async (TripData) => {
    setLoading(true);
  
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docID = Date.now().toString(); // Generate a unique document ID
      
      console.log('Saving trip for user:', user?.email);
      console.log('TripData:', TripData);
  
      // Check for large document size
      const dataSize = JSON.stringify(TripData).length;
      if (dataSize > 1_000_000) {
        throw new Error(`TripData exceeds Firestore's size limit of 1 MB (${dataSize} bytes)`);
      }
  
      // Ensure TripData is an object and not a string.
      const parsedTripData = JSON.parse(TripData);
  
      await setDoc(doc(db, "AITrips", docID), {
        userSelection: formData,
        tripData: parsedTripData, // Now parsing the string into a JSON object
        userEmail: user?.email,
        id: docID,
      });
  
      setLoading(false);
      navigate('/view-trip/' + docID);
  
    } catch (error) {
      setLoading(false);
      console.error("Error saving trip:", error);
    }
  };
  
  

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json',
        }
      });

      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false); // Close dialog after successful login
      OnGenerateTrip(); // Proceed with trip generation
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <Toaster position="bottom-right" />

      <h2 className='font-bold text-3xl'>Tell us your Travel Preferences🗺️🏕️</h2>
      <p className='mt-3 text-white-300 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      {/* Destination Section */}
      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium text-blue-300'>What is your Destination of Choice?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            value: place,
            onChange: (v) => {
              setPlace(v);
              handleInputChange('location', v);
            },
            isClearable: true,
            styles: {
              input: (provided) => ({
                ...provided,
                color: 'black',
              }),
              option: (provided, state) => ({
                ...provided,
                color: state.isFocused ? 'white' : 'black',
                backgroundColor: state.isFocused ? '#396BB8' : 'white',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'black',
              }),
            },
          }}
        />
      </div>

      {/* Days Section */}
      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium text-blue-300'>How many days are you planning the trip?</h2>
        <Input
          placeholder='Ex. 3'
          type='number'
          className='mt-3 p-3 border border-gray-300 rounded-lg bg-white'
          onChange={(e) => handleInputChange('noofdays', e.target.value)}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            color: 'black',
            width: '100%',
          }}
        />
      </div>

      {/* Budget Section */}
      <div className='mt-16'>
        <h2 className='text-xl font-medium mb-5 text-blue-300'>What is your Budget?</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-6 border-4 border-blue-400 rounded-lg hover:border-purple-500 
              hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer
              ${formData?.budget === item.title && 'shadow-lg border-purple-700'}`}
            >
              <h2 className='text-4xl mb-3'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-white-400'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travelers Section */}
      <div className='mt-16'>
        <h2 className='text-xl font-medium mb-5 text-blue-300'>Who are you planning to travel with?</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-6 border-4 border-blue-400 rounded-lg hover:border-purple-500
               hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer
               ${formData?.traveler === item.people && 'shadow-lg border-purple-700'}`}
            >
              <h2 className='text-4xl mb-3'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-white-400'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className='my-16 flex justify-end'>
        <Button className='px-6 py-3 text-lg'
          disabled={loading}

          onClick={OnGenerateTrip}>

          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
            : "Generate Trip"
          }
        </Button>
      </div>

      {/* Styled Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          style={{
            backgroundColor: 'black',
            border: '2px solid blue',
            borderRadius: '8px',
            color: 'white',
            padding: '24px',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: 'white' }}>Sign in with Google</DialogTitle>
            <DialogDescription style={{ color: 'white' }}>
              You must be logged in to generate a trip itinerary. Please log in to continue.
              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-1 flex items-center justify-center">

                <FcGoogle className="mr-2 h-7 w-7" />Sign In

              </Button>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
