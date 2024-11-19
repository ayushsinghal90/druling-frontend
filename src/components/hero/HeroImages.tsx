import React from 'react';

const images = {
  menu: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  phone: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80"
};

const HeroImages = () => {
  return (
    <div className="relative flex w-full min-h-[600px]">
      <div className="absolute bottom-[10%] left-0 right-auto top-auto w-[45%]">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <img
            src={images.menu}
            className="aspect-[3/2] size-full object-cover"
            alt="Restaurant menu on wooden table"
          />
        </div>
      </div>
      <div className="mx-[15%] w-full">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <img
            src={images.restaurant}
            className="aspect-[2/3] size-full object-cover"
            alt="Modern restaurant interior"
          />
        </div>
      </div>
      <div className="absolute bottom-auto left-auto right-0 top-[10%] w-[40%]">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <img
            src={images.phone}
            className="aspect-square size-full object-cover"
            alt="Customer using smartphone in restaurant"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroImages;