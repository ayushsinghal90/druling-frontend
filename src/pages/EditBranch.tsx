import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Save, Building2, ImageIcon } from "lucide-react";
import RequireAuth from "../components/auth/RequireAuth";
import Logo from "../components/common/Logo";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/TextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/Button";
import {
  RestaurantProvider,
  useRestaurant,
} from "../contexts/RestaurantContext";
import { Branch } from "../types";
import LoadingScreen from "../components/common/LoadingScreen";
import { toast } from "react-toastify";
import { EditBranchSchema, formSchema } from "../types/forms/editBranch";
import { useCreateBranch } from "../hooks/useCreateBranch";
import isEqual from "lodash/isEqual";

// Constants
const FORM_SECTIONS = {
  BRANCH_DETAILS: "Branch Details",
  CONTACT_INFO: "Contact Information",
  LOCATION_INFO: "Location Information",
};

const EditBranch = () => {
  const { restaurantId, branchId } = useParams();
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [allowSave, setAllowSave] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { restaurants } = useRestaurant();

  const [branchLogoImage, setBranchLogoImage] = useState<string>("");
  const { editBranch, isLoading } = useCreateBranch();

  const form = useForm<EditBranchSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: {
        name: "",
        description: "",
        image: null,
      },
      contact: {
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
    },
    mode: "onSubmit",
    criteriaMode: "all",
  });

  const { reset, watch } = form;

  const isFormChanged = useCallback(() => {
    const currentValues = form.getValues();
    const initialValues = {
      branch: {
        name: selectedBranch?.name || "",
        description: selectedBranch?.description || "",
        image: null,
      },
      contact: {
        email: selectedBranch?.contact_info?.email || "",
        phone: selectedBranch?.contact_info?.phone_number || "",
      },
      location: {
        address: selectedBranch?.location?.address || "",
        city: selectedBranch?.location?.city || "",
        state: selectedBranch?.location?.state || "",
        postalCode: selectedBranch?.location?.postal_code || "",
        country: selectedBranch?.location?.country || "",
      },
    };

    const isBranchChanged =
      !isEqual(
        { ...currentValues.branch, image: null },
        initialValues.branch
      ) || currentValues.branch.image !== initialValues.branch.image;

    const isContactChanged = !isEqual(
      currentValues.contact,
      initialValues.contact
    );

    const isLocationChanged = !isEqual(
      currentValues.location,
      initialValues.location
    );

    return isBranchChanged || isContactChanged || isLocationChanged;
  }, [form, selectedBranch]);

  useEffect(() => {
    if (restaurantId && branchId) {
      const fetchBranch = async () => {
        setLoading(true);
        const restaurant = restaurants.find((r) => r.id === restaurantId);
        if (restaurant) {
          const branch = restaurant?.branches?.find((b) => b.id === branchId);
          if (branch) {
            setSelectedBranch(branch);
            reset({
              branch: {
                name: selectedBranch?.name || "",
                description: selectedBranch?.description || "",
                image: null,
              },
              contact: {
                email: selectedBranch?.contact_info?.email || "",
                phone: selectedBranch?.contact_info?.phone_number || "",
              },
              location: {
                address: selectedBranch?.location?.address || "",
                city: selectedBranch?.location?.city || "",
                state: selectedBranch?.location?.state || "",
                postalCode: selectedBranch?.location?.postal_code || "",
                country: selectedBranch?.location?.country || "",
              },
            });
            setAllowSave(!isFormChanged());
          } else {
            navigate(`/dashboard/restaurants`);
          }
        }
        setLoading(false);
      };

      fetchBranch();
    }
  }, [
    restaurantId,
    branchId,
    restaurants,
    isFormChanged,
    navigate,
    reset,
    selectedBranch,
  ]);

  useEffect(() => {
    const subscription = watch(() => {
      setAllowSave(!isFormChanged());
    });
    return () => subscription.unsubscribe();
  }, [watch, isFormChanged]);

  const handleFormSubmit = async (data: EditBranchSchema) => {
    try {
      const result = await editBranch(selectedBranch, data);

      if (result?.success) {
        navigate("/dashboard/restaurants");
      } else {
        const errorMessage =
          typeof result?.message === "string"
            ? result.message
            : "An unexpected error occurred.";
        toast.error(errorMessage);
      }
    } catch {
      toast.error("An unexpected error occurred.");
    }
  };

  const handleBranchLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!handleFileChange(file, setBranchLogoImage)) return;
      form.setValue("branch.image", file);
      isFormChanged();
    }
  };

  const handleFileChange = (
    file: File,
    setPreview: {
      (value: React.SetStateAction<string>): void;
      (value: React.SetStateAction<string>): void;
      (arg0: string): void;
    }
  ) => {
    const allowedExtensions = ["image/png", "image/jpeg"];
    if (!allowedExtensions.includes(file.type)) {
      toast.error("Only PNG and JPG files are allowed");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 1MB");
      return false;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    return true;
  };

  if (loading || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LogoSection />
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <FormHeader
          title="Edit Branch"
          icon={<Building2 className="h-6 w-6 text-gray-400" />}
        />
        <BranchForm
          form={form}
          handleFormSubmit={handleFormSubmit}
          allowSave={allowSave}
          previewImage={branchLogoImage}
          handleImageChange={handleBranchLogoChange}
        />
      </div>
    </div>
  );
};

const BranchForm = ({
  form,
  handleFormSubmit,
  allowSave,
  previewImage,
  handleImageChange,
}: {
  form: ReturnType<typeof useForm<EditBranchSchema>>;
  handleFormSubmit: (data: EditBranchSchema) => void;
  allowSave: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewImage: string;
}) => (
  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="mt-6">
    <div className="space-y-8">
      <FormSection title={FORM_SECTIONS.BRANCH_DETAILS}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-1/3 md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch Image
            </label>
            <div className="relative">
              <div className="aspect-square w-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">
                      Click to upload
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 1MB</p>
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
          <div className="flex-1 space-y-4">
            <Input
              label="Branch Name"
              placeholder="Downtown Branch"
              required
              {...form.register("branch.name")}
              error={form.formState.errors.branch?.name?.message}
            />
            <Textarea
              label="Branch Description"
              placeholder="This branch is located in the heart of the city..."
              {...form.register("branch.description")}
              error={form.formState.errors.branch?.description?.message}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title={FORM_SECTIONS.CONTACT_INFO}>
        <Input
          label="Email Address"
          type="email"
          placeholder="contact@branch.com"
          required
          {...form.register("contact.email")}
          error={form.formState.errors.contact?.email?.message}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 234 567 890"
          required
          {...form.register("contact.phone")}
          error={form.formState.errors.contact?.phone?.message}
        />
      </FormSection>

      <FormSection title={FORM_SECTIONS.LOCATION_INFO}>
        <Textarea
          label="Address"
          placeholder="123 Main St, Suite 100"
          required
          {...form.register("location.address")}
          error={form.formState.errors.location?.address?.message}
        />
        <Input
          label="City"
          placeholder="New York"
          required
          {...form.register("location.city")}
          error={form.formState.errors.location?.city?.message}
        />
        <Input
          label="State"
          placeholder="NY"
          required
          {...form.register("location.state")}
          error={form.formState.errors.location?.state?.message}
        />
        <Input
          label="Postal Code"
          placeholder="10001"
          required
          {...form.register("location.postalCode")}
          error={form.formState.errors.location?.postalCode?.message}
        />
        <Input
          label="Country"
          placeholder="United States"
          required
          {...form.register("location.country")}
          error={form.formState.errors.location?.country?.message}
        />
      </FormSection>
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
        onClick={(e) => {
          e.preventDefault();
          form.handleSubmit(handleFormSubmit)();
        }}
        disabled={allowSave}
      >
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
    </div>
  </form>
);

const LogoSection = () => (
  <div className="flex justify-center py-8">
    <Link
      to="/dashboard"
      className="flex items-center hover:opacity-80 transition-opacity duration-200"
    >
      <Logo color="text-black" textSize="text-2xl" />
    </Link>
  </div>
);

const FormHeader = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => (
  <div className="border-b border-gray-200 px-4 py-4 sm:px-6 bg-white rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          {icon}
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
      </div>
    </div>
  </div>
);

const FormSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4 pb-6 px-4 py-6 sm:px-6 bg-white rounded-lg shadow-sm">
    <h2 className="border-b border-gray-200 pb-4 text-md font-semibold text-gray-900">
      {title}
    </h2>
    {children}
  </div>
);

// Wrap with RequireAuth HOC
const ProtectedEditBranch = () => (
  <RequireAuth>
    <RestaurantProvider>
      <EditBranch />
    </RestaurantProvider>
  </RequireAuth>
);

export default ProtectedEditBranch;
