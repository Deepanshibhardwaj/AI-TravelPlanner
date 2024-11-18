import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log('Logged-in user:', user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.error('Error during login:', error);
    }
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'Application/json',
          }
        }
      );

      console.log('User Profile Response:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false); // Automatically close the dialog box
      window.location.reload(); // Refresh the page to reflect login changes
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div className="p-2 shadow-sm flex items-center justify-between px-5 bg-black">
      <img src="/voyage.png" className="w-25 h-20 object-contain" alt="Logo" />
      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
            <Button className="text-white border-white px-6 py-2 text-lg">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button className="text-white border-white px-6 py-2 text-lg">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' alt="User" />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className='cursor-pointer'
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className="text-white border-white px-6 py-2 text-lg"
          >
            Sign in
          </Button>
        )}
      </div>

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
                className="w-full mt-1 flex items-center justify-center"
              >
                <FcGoogle className="mr-2 h-7 w-7" />Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
