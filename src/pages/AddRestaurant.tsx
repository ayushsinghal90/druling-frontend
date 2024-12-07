import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Building2, Image as ImageIcon } from "lucide-react";
import RequireAuth from "../components/auth/RequireAuth";
import Logo from "../components/Logo";

interface FormData {
  restaurant: {
    name: string;
    image: File | null;
    email: string;
    phone: string;
  };
  branch: {
    name: string;
    manager: string;
    email: string;
    phone: string;
    address: string;
  };
}

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");
  const restaurantName = searchParams.get("restaurantName");

  const [formData, setFormData] = useState<FormData>({
    restaurant: {
      name: "",
      image: null,
      email: "",
      phone: "",
    },
    branch: {
      name: "",
      manager: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string>("");

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

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 py-6 sm:px-6">
            <div className="space-y-8">
              {/* Restaurant Section */}
              {!restaurantId && (
                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                      Restaurant Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Add details about your restaurant
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Restaurant Image
                      </label>
                      <div className="relative">
                        <div className="aspect-square w-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="h-full w-full object-cover rounded-lg"
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
                          htmlFor="restaurantEmail"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Restaurant Email
                        </label>
                        <input
                          type="email"
                          id="restaurantEmail"
                          value={formData.restaurant.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              restaurant: {
                                ...prev.restaurant,
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
                          htmlFor="restaurantPhone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Restaurant Phone
                        </label>
                        <input
                          type="tel"
                          id="restaurantPhone"
                          value={formData.restaurant.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              restaurant: {
                                ...prev.restaurant,
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

              {/* Branch Section */}
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Branch Information
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {restaurantId
                      ? `Add a new branch for ${restaurantName}`
                      : "Add details for your first branch"}
                  </p>
                </div>

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
                        branch: { ...prev.branch, name: e.target.value },
                      }))
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="manager"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Branch Manager
                  </label>
                  <input
                    type="text"
                    id="manager"
                    value={formData.branch.manager}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        branch: { ...prev.branch, manager: e.target.value },
                      }))
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="branchEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Branch Email
                  </label>
                  <input
                    type="email"
                    id="branchEmail"
                    value={formData.branch.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        branch: { ...prev.branch, email: e.target.value },
                      }))
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="branchPhone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Branch Phone
                  </label>
                  <input
                    type="tel"
                    id="branchPhone"
                    value={formData.branch.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        branch: { ...prev.branch, phone: e.target.value },
                      }))
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Branch Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    value={formData.branch.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        branch: { ...prev.branch, address: e.target.value },
                      }))
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Link
                to="/dashboard/restaurants"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                {restaurantId ? "Add Branch" : "Create Restaurant"}
              </button>
            </div>
          </form>
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
