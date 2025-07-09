import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx"; // ✅

// import Footer from "./view-trip/components/Footer.jsx";


const router= createBrowserRouter([
  {
  path:'/',
  element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip/>
  },
  {
    path:"/My-Trips",
    element:<MyTrips/>
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
      {/* <Footer/> */}
    </GoogleOAuthProvider>
  </StrictMode>
);