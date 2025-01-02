import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Lock, Save, Camera } from "lucide-react";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import UserAvatar from "../../components/common/UserAvatar";
import { useAuth } from "../../hooks/useAuth";
import LoadingLogo from "../../components/common/LoadingLogo";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfileMutation } from "../../store/services/profileApi";
import { Profile as ProfileType } from "../../types";
import { useDispatch } from "react-redux";
import { setProfile } from "../../store/slices/authSlice";

// Define schema for form validation
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  avatarUrl: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allowSave, setAllowSave] = useState(false);
  const { profile, loading } = useAuth();
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: profile?.first_name || "",
      lastName: profile?.last_name || "",
      email: profile?.contact_info?.email || "",
      phone: profile?.contact_info?.phone_number || "",
      avatarUrl: "",
    },
    mode: "onSubmit",
    criteriaMode: "all",
  });

  const isFormChanged = useCallback(() => {
    const currentValues = getValues();
    const initialValues = {
      firstName: profile?.first_name || "",
      lastName: profile?.last_name || "",
      email: profile?.contact_info?.email || "",
      phone: "",
      avatarUrl: "",
    };

    return Object.keys(currentValues).some((key) => {
      const typedKey = key as keyof typeof currentValues;
      return (
        String(currentValues[typedKey]).trim() !==
        String(initialValues[typedKey]).trim()
      );
    });
  }, [getValues, profile]);

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile?.first_name || "",
        lastName: profile?.last_name || "",
        email: profile?.contact_info?.email || "",
        phone: profile?.contact_info?.phone_number || "",
        avatarUrl: "",
      });
    }
  }, [profile, reset]);

  useEffect(() => {
    const subscription = watch(() => {
      setAllowSave(isFormChanged());
    });
    return () => subscription.unsubscribe();
  }, [watch, isFormChanged]);

  const avatarUrl = watch("avatarUrl");

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const updateRequest: ProfileType = {
        first_name: data.firstName,
        last_name: data.lastName,
        contact_info: {
          email: data.email,
          phone_number: data.phone,
        },
      };
      const response = await updateProfile(updateRequest).unwrap();

      if (response.success) {
        dispatch(setProfile(response.data));
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }

      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const url = URL.createObjectURL(file);
      setValue("avatarUrl", url);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0) {
      value = `+${value.slice(0, 2)} ${value.slice(2, 7)} ${value.slice(
        7,
        12
      )}`;
    }
    setValue("phone", value);
  };

  if (loading) {
    return <LoadingLogo />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header section */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account information
          </p>
        </div>

        <div className="rounded-xl bg-white shadow-sm">
          {/* Form header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h2>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar section */}
              <div className="flex flex-[0.5] justify-center items-center lg:w-48">
                <div className="relative group">
                  <UserAvatar
                    imageUrl={avatarUrl}
                    size="lg"
                    className="border-2 border-gray-200 w-64 h-64"
                  />
                  {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex flex-col items-center text-white">
                        <Camera className="h-6 w-6 mb-1" />
                        <span className="text-xs">Change Photo</span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Form fields */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      {...register("firstName")}
                      placeholder="John"
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      {...register("lastName")}
                      placeholder="Smith"
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="john.smith@example.com"
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    onChange={handlePhoneChange}
                    placeholder="+91 98765 43210"
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
              {!isEditing ? (
                <>
                  <Link
                    to="/change-password"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                    disabled={isSubmitting}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !allowSave}
                    className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
