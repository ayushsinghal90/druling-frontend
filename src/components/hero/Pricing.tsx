import React from "react";
import { Check } from "lucide-react";

const features = {
  basic: [
    "Free website",
    "Mobile friendly design",
    "Image Menu",
    "Promote deals and offers",
    "Priority support",
    "Advanced menu customization",
    "Multiple QR codes design for standees",
    "Analytics dashboard",
  ],
  enterprise: [
    "All Basic features",
    "Up to 4 reaturant menu websites",
    "Individual QR codes per website",
    "Analytics per website",
    "Centralized management",
  ],
};

const Pricing = () => {
  return (
    <div id="pricing" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that best fits your restaurant's needs
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-7xl overflow-hidden">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-4">
            <div className="w-full rounded-3xl bg-white p-8 shadow-sm sm:p-10">
              <div className="flex flex-col items-start">
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                  Basic
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Perfect for single restaurant location
                </p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-x-1">
                    <span className="text-lg font-semibold leading-6 text-gray-600 line-through">
                      ₹1,099
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      /year
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-x-2">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      Free
                    </span>
                    <span className="text-base font-semibold leading-6 text-gray-600">
                      for first year
                    </span>
                  </div>
                </div>

                <button className="mt-8 w-full rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200">
                  Get started for free
                </button>

                <div className="mt-8 w-full">
                  <ul
                    role="list"
                    className="space-y-4 text-sm leading-6 text-gray-600"
                  >
                    {features.basic.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check
                          className="h-6 w-5 flex-none text-indigo-600"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="w-full rounded-3xl bg-white p-8 shadow-sm  sm:p-10">
              <div className="flex flex-col items-start">
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                  Advance
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  For businesses with multiple restaurant menu
                </p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-x-2">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      ₹2,999
                    </span>
                    <span className="text-base font-semibold leading-6 text-gray-600">
                      /year
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    For up to 4 QR menu websites
                  </p>
                </div>

                <button className="mt-8 w-full rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white shadow hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-all duration-200">
                  Contact sales
                </button>
                <p className="mt-3 text-sm text-center w-full text-gray-500">
                  Custom solutions available for 5+ websites
                </p>

                <div className="mt-8 w-full">
                  <ul
                    role="list"
                    className="space-y-4 text-sm leading-6 text-gray-600"
                  >
                    {features.enterprise.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check
                          className="h-6 w-5 flex-none text-gray-900"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
