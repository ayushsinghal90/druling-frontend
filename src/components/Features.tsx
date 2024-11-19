import React from 'react';
import { QrCode, UtensilsCrossed, Smartphone, Clock, Image, Coins } from 'lucide-react';

const features = [
  {
    name: 'Instant QR Generation',
    description: 'Generate unique QR codes for your menu that customers can scan with any smartphone.',
    icon: QrCode,
  },
  {
    name: 'Easy Menu Management',
    description: 'Update your menu items, prices, and descriptions in real-time without reprinting.',
    icon: UtensilsCrossed,
  },
  {
    name: 'Mobile Optimized',
    description: 'Beautiful, responsive design that works perfectly on all devices.',
    icon: Smartphone,
  },
  {
    name: 'Quick Setup',
    description: 'Get your digital menu up and running in minutes, not hours.',
    icon: Clock,
  },
  {
    name: 'Image Recognition',
    description: "Upload your existing menu image and we'll convert it automatically.",
    icon: Image,
  },
  {
    name: 'Cost Effective',
    description: 'Save money on printing costs with our affordable digital solution.',
    icon: Coins,
  },
];

const Features = () => {
  return (
    <div id="features" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-black">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Everything you need to digitize your menu
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Transform your restaurant's menu into an interactive digital experience with our comprehensive suite of features.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-black">
                  <feature.icon className="h-5 w-5 flex-none text-black" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;