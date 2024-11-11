import React from 'react';

function About() {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between py-16 px-5 lg:px-32">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {/* Large Image */}
          <div className="row-span-2 col-span-1 overflow-hidden transition-transform transform hover:scale-105 duration-300">
            <img 
              src="/greenlake.jpg"  // The larger image
              alt="Lake" 
              className="w-full h-full object-cover" 
              style={{ maxHeight: '600px', objectFit: 'cover' }} // Adjusting the height
            />
          </div>
          {/* Two Smaller Images */}
          <div className="col-span-1 row-span-1 overflow-hidden transition-transform transform hover:scale-105 duration-300">
            <img 
              src="/tajmahal.jpg"  // First small image
              alt="Small Image 1" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="col-span-1 row-span-1 overflow-hidden transition-transform transform hover:scale-105 duration-300">
            <img 
              src="/blue.jpg"  // Second small image
              alt="Small Image 2" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
      
      {/* Text Section */}
      <div className="w-full lg:w-1/2 lg:pl-12 transition-opacity duration-500 hover:opacity-90">
        <h2 className="text-4xl font-bold mb-4">Here's make a perfect vacation for you!</h2>
        <p className="text-lg leading-relaxed text-white">
          We believe in the beauty of travel, the serenity of exploring new places, and the joy of immersing oneself in the history and culture of our surroundings. Our mission is to curate experiences that bring peace, adventure, and unforgettable memories to everyone. Discover a whole new way of traveling with our AI-powered trip planner.<br />
          Whether you're seeking adventure, relaxation, or a little of both, our platform customizes every detail of your journey to suit your unique preferences. From selecting the perfect destination to curating personalized itineraries, we make trip planning effortless and exciting. Say goodbye to the stress of organizing your next adventure—let our smart technology handle everything, ensuring a seamless, budget-friendly, and unforgettable travel experience. Get ready to explore the world, your way!
        </p>
      </div>
    </div>
  );
}

export default About;
