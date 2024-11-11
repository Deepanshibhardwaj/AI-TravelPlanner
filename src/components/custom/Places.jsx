import React from 'react';

function Places() {
  return (
    <div className="bg-black w-full my-15 space-y-4 ">
      <div className="text-center pt-6">
        <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            The Wonders Of Nature
            </span>
            </h1>
      </div>
      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        <img
          src="/pinkskyy.jpg"
          alt="Nature 1"
          className="w-full h-auto object-cover rounded-lg"
        />
        <img
          src="/sunset.jpg"
          alt="Nature 2"
          className="w-full h-auto object-cover rounded-lg"
        />
        <img
          src="/folkstone.jpg"
          alt="Nature 3"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default Places;
