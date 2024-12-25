import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Save, Building2 } from "lucide-react";
import RequireAuth from "../components/auth/RequireAuth";
import Logo from "../components/Logo";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/TextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/Button";

// Define schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  description: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

type FormData = z.infer<typeof formSchema>;

const EditBranch = () => {
  const { restaurantId, branchId } = useParams();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    mode: "onTouched",
    criteriaMode: "firstError",
  });

  const handleSubmit = form.handleSubmit((data) => {
    // Handle form submission
    navigate(`/dashboard/restaurants`);
  });

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
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-gray-400" />
                <h1 className="text-lg font-semibold text-gray-900">
                  Edit Branch
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="space-y-8">
            {/* Branch Details Section */}
            <div className="space-y-4 pb-6 px-4 py-6 sm:px-6 bg-white rounded-lg shadow-sm">
              <h2 className="border-b border-gray-200 pb-4 text-md font-semibold text-gray-900">
                Branch Details
              </h2>

              <Input
                label="Branch Name"
                placeholder="Downtown Branch"
                required
                {...form.register("name")}
                error={form.formState.errors.name?.message}
              />
              <Textarea
                label="Branch Description"
                placeholder="This branch is located in the heart of the city..."
                {...form.register("description")}
                error={form.formState.errors.description?.message}
              />
            </div>

            {/* Contact Section */}
            <div className="space-y-4 pb-6 px-4 py-6 sm:px-6 bg-white rounded-lg shadow-sm">
              <h2 className="border-b border-gray-200 pb-4 text-md font-semibold text-gray-900">
                Contact Information
              </h2>
              <Input
                label="Email Address"
                type="email"
                placeholder="contact@branch.com"
                required
                {...form.register("email")}
                error={form.formState.errors.email?.message}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 234 567 890"
                required
                {...form.register("phone")}
                error={form.formState.errors.phone?.message}
              />
            </div>

            {/* Location Section */}
            <div className="space-y-4 px-4 py-6 sm:px-6 bg-white rounded-lg shadow-sm">
              <h2 className="border-b border-gray-200 pb-4 text-md font-semibold text-gray-900">
                Location Information
              </h2>
              <Textarea
                label="Address"
                placeholder="123 Main St, Suite 100"
                required
                {...form.register("address")}
                error={form.formState.errors.address?.message}
              />
              <Input
                label="City"
                placeholder="New York"
                required
                {...form.register("city")}
                error={form.formState.errors.city?.message}
              />
              <Input
                label="State"
                placeholder="NY"
                required
                {...form.register("state")}
                error={form.formState.errors.state?.message}
              />
              <Input
                label="Postal Code"
                placeholder="10001"
                required
                {...form.register("postalCode")}
                error={form.formState.errors.postalCode?.message}
              />
              <Input
                label="Country"
                placeholder="United States"
                required
                {...form.register("country")}
                error={form.formState.errors.country?.message}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Link
              to="/dashboard/restaurants"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              variant="default"
              className="rounded-lg px-4 py-2 text-sm font-medium"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Wrap with RequireAuth HOC
const ProtectedEditBranch = () => (
  <RequireAuth>
    <EditBranch />
  </RequireAuth>
);

export default ProtectedEditBranch;
