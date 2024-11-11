import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { SelectBudgetOptions, SelectTravelersList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = () => {
    if (!formData?.location || !formData?.budget || !formData.traveler) {
      toast.error("Please fill all the details.", {
        style: {
          backgroundColor: '#333',
          color: '#fff',
          borderRadius: '8px',
          padding: '16px',
        },
      });
      return;
    }
    console.log('Generating trip with the following data:', formData);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      {/* Toaster component for notifications at bottom-right */}
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
    </div>
  );
}

export default CreateTrip;