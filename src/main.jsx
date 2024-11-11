import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import CreateTrip from './create-trip/index.jsx'; // Correct import path
import Header from './components/custom/Header.jsx'; // Import the Header component (assuming the path is correct)
import './index.css'; // Correct order of imports
import { Toaster } from 'sonner';


// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  }
]);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header /> 
  <Toaster/>

    <RouterProvider router={router} />
  </StrictMode>
);
