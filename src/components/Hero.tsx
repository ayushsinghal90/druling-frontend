import { get } from 'lodash';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const openCalendly = () => {
    window.open('https://calendly.com/druling/demo', '_blank');
  };

  const getStarted = () => {
    navigate("/register");
  };

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 lg:w-full lg:max-w-2xl">
          <div className="relative px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
                Transform Your Paper Menu into a Digital Experience
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Create an elegant digital menu with QR code in minutes. Enhance your customers' dining experience and streamline your operations.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                {/* <button
                  onClick={openCalendly}
                  className="rounded-md bg-black px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Schedule Demo
                </button> */}
                <button
                  onClick={getStarted}
                  className="rounded-md bg-black px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80"
          alt="Restaurant QR menu showcase"
          className="aspect-[3/2] h-full w-full object-cover lg:aspect-auto"
        />
      </div>
    </div>
  );
};

export default Hero;