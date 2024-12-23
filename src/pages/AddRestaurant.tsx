import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Building2, Image as ImageIcon } from "lucide-react";
import RequireAuth from "../components/auth/RequireAuth";
import Logo from "../components/Logo";

interface FormData {
  restaurant: {
    name: string;
    image: File | null;
    description?: string;
  };
  branch: {
    name: string;
    manager?: string;
    email: string;
    phone: string;
    description?: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface StepHeaderProps {
  header: string;
  description: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({ header, description }) => {
  return (
    <div className="border-b border-gray-200 pb-4 mb-10">
      <h2 className="text-lg font-medium text-gray-900">{header}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");

  const [formData, setFormData] = useState<FormData>({
    restaurant: {
      name: "",
      image: null,
      description: "",
    },
    branch: {
      name: "",
      manager: "",
      description: "",
      email: "",
      phone: "",
    },
    location: {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    contact: {
      email: "",
      phone: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = ["Restaurant", "Branch & Contact", "Location"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          image: file,
        },
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate("/dashboard/restaurants");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo Section */}
      <div className="flex justify-center py-8">
        <Link
          to="/dashboard"
          className="flex items-center hover:opacity-80 transition-opacity duration-200"
        >
          <Logo color="text-black" textSize="text-2xl" />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <Link
              to="/dashboard/restaurants"
              className="mr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-gray-400" />
              <h1 className="text-lg font-semibold text-gray-900">
                {restaurantId ? "Add New Branch" : "Add New Restaurant"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-6xl mx-auto py-8">
        <div className="px-4  flex-auto">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-200 px-4 pb-4 sm:px-6">
              {/* Form Content */}
              <div className="w-full p-6">
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <StepHeader
                      header="Restaurant Information"
                      description="Add details about the restaurant."
                    />
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-1/3 md:w-1/4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Restaurant Image
                        </label>
                        <div className="relative">
                          <div className="aspect-square w-full rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                            {previewImage ? (
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="h-full w-full object-cover rounded-full"
                              />
                            ) : (
                              <div className="text-center">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-xs text-gray-500">
                                  Upload image
                                </p>
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 space-y-6">
                        <div>
                          <label
                            htmlFor="restaurantName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Restaurant Name
                          </label>
                          <input
                            type="text"
                            id="restaurantName"
                            value={formData.restaurant.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                restaurant: {
                                  ...prev.restaurant,
                                  name: e.target.value,
                                },
                              }))
                            }
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Restaurant description
                          </label>
                          <textarea
                            id="description"
                            rows={3}
                            value={formData.restaurant.description}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                restaurant: {
                                  ...prev.restaurant,
                                  description: e.target.value,
                                },
                              }))
                            }
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <StepHeader
                      header="Branch Information"
                      description="Add details about the branch information."
                    />
                    <div className="space-y-4">
                      {/* Branch Section */}
                      <div className="space-y-4">
                        <h3 className="text-md font-medium text-gray-700">
                          Branch Details
                        </h3>
                        <div>
                          <label
                            htmlFor="branchName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Branch Name
                          </label>
                          <input
                            type="text"
                            id="branchName"
                            value={formData.branch.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                branch: {
                                  ...prev.branch,
                                  name: e.target.value,
                                },
                              }))
                            }
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="branchDescription"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Branch Description
                          </label>
                          <textarea
                            id="branchDescription"
                            rows={3}
                            value={formData.branch.description}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                branch: {
                                  ...prev.branch,
                                  description: e.target.value,
                                },
                              }))
                            }
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                            required
                          />
                        </div>
                      </div>

                      {/* Contact Section */}
                      <div className="space-y-6 boarder-t border-gray-200 pt-4">
                        <StepHeader
                          header="Contact Information"
                          description="Add contact information."
                        />
                        <div>
                          <label
                            htmlFor="contactEmail"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Contact Email
                          </label>
                          <input
                            type="email"
                            id="contactEmail"
                            value={formData.contact.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                contact: {
                                  ...prev.contact,
                                  email: e.target.value,
                                },
                              }))
                            }
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contactPhone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Contact Phone
                          </label>
                          <input
                            type="tel"
                            id="contactPhone"
                            value={formData.contact.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                contact: {
                                  ...prev.contact,
                                  phone: e.target.value,
                                },
                              }))
                            }
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <StepHeader
                      header="Location Information"
                      description="Add location details for the branch."
                    />
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <textarea
                          id="address"
                          rows={3}
                          value={formData.location.address}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                address: e.target.value,
                              },
                            }))
                          }
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={formData.location.city}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                city: e.target.value,
                              },
                            }))
                          }
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          value={formData.location.state}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                state: e.target.value,
                              },
                            }))
                          }
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          value={formData.location.postalCode}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                postalCode: e.target.value,
                              },
                            }))
                          }
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          value={formData.location.country}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                country: e.target.value,
                              },
                            }))
                          }
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Previous
                    </button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev + 1)}
                      className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {restaurantId ? "Add Branch" : "Create Restaurant"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Steps Sidebar */}
        <div className="w-1/4 px-4 hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm border-b border-gray-200 px-4 py-4 sm:px-6 h-full">
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 p-2 mb-4">
              Steps
            </h2>
            <ul className="space-y-4">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`cursor-pointer py-2 px-4 rounded-lg text-sm font-medium ${
                    currentStep === index
                      ? "bg-black text-white"
                      : "text-gray-700 "
                  }`}
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap with RequireAuth HOC
const ProtectedAddRestaurant = () => (
  <RequireAuth>
    <AddRestaurant />
  </RequireAuth>
);

export default ProtectedAddRestaurant;
