import React from "react";
import { X, Mail, Phone, MessageSquare } from "lucide-react";
import { Restaurant } from "../../types";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant;
}

const ContactModal = ({ isOpen, onClose, restaurant }: ContactModalProps) => {
  if (!isOpen) return null;

  // Use the first branch as the main contact information
  const mainContact = restaurant.contact_info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Contact Support
            </h2>
          </div>
          <p className="text-lg font-medium text-gray-900">{restaurant.name}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-base text-gray-600">{mainContact?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <Phone className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Phone</p>
              <p className="text-base text-gray-600">
                {mainContact?.phone_number}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-8 border-t border-gray-100">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
