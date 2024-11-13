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

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

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
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData.traveler) {
      setOpenDialog(true);
      return;
    }

    const FINAL_PROMPT = AI_Prompt
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noofdays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noofdays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
    }
  };

  const GetUserProfile=async(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then ((resp)=>{

      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);

      OnGenerateTrip();
    })

  }
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
        <Button className='px-6 py-3 text-lg' onClick={OnGenerateTrip}>
          Generate Trip
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
