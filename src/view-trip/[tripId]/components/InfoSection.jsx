import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { LuSendHorizonal } from "react-icons/lu";




function InfoSection({ trip }) {

    const [photoUrl,setPhotoUrl]=useState();
    
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip])

    const GetPlacePhoto=async()=>{

        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[3].name);
             const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
             setPhotoUrl(PhotoUrl);
        })
    }
    return (
        <div>
            <img src={photoUrl}  className='h-[400px] w-screen object-cover'  alt="Airplane" />
            <div className='flex justify-between items-center '>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl text-white'>
                        {trip?.userSelection?.location?.label} 
                        <span className='font-normal text-sm'>   🌥️ 25°C</span>
                    </h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-blue-500 font-bold rounded-full text-white text-xs md:text-md'> 📆 {trip.userSelection?.noofdays} Days</h2>
                        <h2 className='p-1 px-3 bg-blue-500 font-bold rounded-full text-white text-xs md:text-md'> 💶 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-blue-500 font-bold rounded-full text-white text-xs md:text-md'>🫂  No. Of Travelers: {trip.userSelection?.traveler}</h2>
                    </div>
                </div>
                {/* <Button><LuSendHorizonal /></Button> */}
            </div>
        </div>
    );
}

export default InfoSection;
