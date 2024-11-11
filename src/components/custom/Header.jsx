import React from 'react';
import { Button } from '../ui/button';

function Header() {
  return (
    <div className="p-2 shadow-sm flex items-center justify-between px-5 bg-black">
      {/* Image on the extreme left */}
      <img src="/voyage.png" className="w-25 h-20 object-contain" alt="Logo" />
      
      {/* Button on the extreme right */}
      <Button className="text-white border-white px-6 py-2 text-lg">Sign in</Button>
    </div>
  );
}

export default Header;
