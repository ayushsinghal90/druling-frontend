import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="text-black hover:text-gray-600">← Back to home</Link>
        </div>
        <h1 className="text-4xl font-bold text-black mb-8">Terms of Service</h1>
        
        <div className="prose prose-black max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using Druling's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p className="mb-4">
            Druling provides digital menu solutions including QR code generation, menu management, and related services for restaurants and food service establishments.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p className="mb-4">
            You must create an account to use our services. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Service Usage</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">You agree to use the service for lawful purposes only</li>
            <li className="mb-2">You will not upload harmful or malicious content</li>
            <li className="mb-2">You will not attempt to breach or circumvent our security measures</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Payment Terms</h2>
          <p className="mb-4">
            Subscription fees are billed in advance on a monthly or annual basis. All payments are non-refundable unless otherwise required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
          <p className="mb-4">
            We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any violation of these terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at support@druling.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;