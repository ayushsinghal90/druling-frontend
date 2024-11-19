import React, { useState } from 'react';
import { QrCode, Upload, ArrowRight, Smartphone } from 'lucide-react';

const Demo = () => {
  const [step, setStep] = useState(1);
  const [menuImage, setMenuImage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMenuImage(event.target?.result as string);
        setStep(2);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Try MenuQR Now</h1>
          <p className="text-lg text-gray-600">Experience how easy it is to digitize your menu</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between items-center">
            <div className={`flex-1 flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-current">
                <Upload className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <p className="font-medium">Upload Menu</p>
                <p className="text-sm">Upload your existing menu</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 mx-4" />
            <div className={`flex-1 flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-current">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <p className="font-medium">Generate QR</p>
                <p className="text-sm">Get your digital menu QR</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 mx-4" />
            <div className={`flex-1 flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-current">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <p className="font-medium">Preview</p>
                <p className="text-sm">See your digital menu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on current step */}
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="max-w-xl mx-auto">
                <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Upload Your Menu</h3>
                <p className="text-gray-600 mb-6">
                  Upload your existing menu image and we'll convert it into a beautiful digital menu
                </p>
                <label className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  Choose Image
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="max-w-xl mx-auto text-center">
                <QrCode className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Your QR Code is Ready!</h3>
                <p className="text-gray-600 mb-6">
                  Scan this QR code to see your digital menu in action
                </p>
                <div className="bg-gray-100 p-8 rounded-lg inline-block mb-6">
                  <QrCode className="w-32 h-32 text-gray-900" />
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Preview Digital Menu
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="max-w-sm mx-auto">
                <div className="border-8 border-gray-900 rounded-3xl overflow-hidden">
                  <div className="bg-gray-900 px-4 py-2 flex items-center justify-center">
                    <div className="w-12 h-1 bg-gray-700 rounded-full" />
                  </div>
                  <div className="bg-white aspect-[9/16] p-4">
                    {menuImage ? (
                      <img
                        src={menuImage}
                        alt="Uploaded menu"
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                        <p className="text-gray-500">Menu Preview</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Try Another Menu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;