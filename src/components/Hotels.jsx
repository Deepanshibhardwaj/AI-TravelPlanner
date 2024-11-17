import React from 'react';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-white text-2xl mt-5">Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    
          <div>
            <img src="/hotel1.jpg" alt="Hotel" className="w-full h-56 object-cover" />
          </div>
      
      </div>
      </div>
  
  );
}

export default Hotels;
