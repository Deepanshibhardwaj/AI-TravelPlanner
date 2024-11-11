import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative bg-black p-6 pt-16 flex flex-col justify-center items-center text-center">
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/blackskyy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to prevent video from affecting text visibility (optional) */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-4xl text-white mb-4">
          Say goodbye to travel stress — let AI handle the planning!
        </h1>
        <p className="text-[#396BB8] text-xl max-w-3xl mb-8">
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
          <Button className="text-white border-blue-600 px-6 py-2 text-lg">
            Get Started, It's Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
