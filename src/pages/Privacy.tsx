import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="text-black hover:text-gray-600">← Back to home</Link>
        </div>
        <h1 className="text-4xl font-bold text-black mb-8">Privacy Policy</h1>
        
        <div className="prose prose-black max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Account information (name, email, password)</li>
            <li className="mb-2">Restaurant details and menu content</li>
            <li className="mb-2">Payment information</li>
            <li className="mb-2">Usage data and analytics</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Provide and maintain our services</li>
            <li className="mb-2">Process payments and send administrative emails</li>
            <li className="mb-2">Improve and optimize our services</li>
            <li className="mb-2">Protect against fraud and unauthorized access</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
          <p className="mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Service providers who assist in our operations</li>
            <li className="mb-2">Law enforcement when required by law</li>
            <li className="mb-2">Third parties with your explicit consent</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
          <p className="mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Access your personal information</li>
            <li className="mb-2">Correct inaccurate data</li>
            <li className="mb-2">Request deletion of your data</li>
            <li className="mb-2">Object to data processing</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at privacy@druling.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;