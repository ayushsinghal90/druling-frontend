import React, { useEffect, useState, useCallback } from "react";
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
import {
  RestaurantProvider,
  useRestaurant,
} from "../contexts/RestaurantContext";
import { Branch } from "../types";
import LoadingScreen from "../components/common/LoadingScreen";

// Constants
const FORM_SECTIONS = {
  BRANCH_DETAILS: "Branch Details",
  CONTACT_INFO: "Contact Information",
  LOCATION_INFO: "Location Information",
};

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
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [allowSave, setAllowSave] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { restaurants } = useRestaurant();

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
    mode: "onSubmit",
    criteriaMode: "all",
  });

  const { reset, watch } = form;

  const isFormChanged = useCallback(() => {
    const currentValues = form.getValues();
    const initialValues = {
      name: selectedBranch?.name || "",
      description: selectedBranch?.description || "",
      email: selectedBranch?.contact_info?.email || "",
      phone: selectedBranch?.contact_info?.phone_number || "",
      address: selectedBranch?.location?.address || "",
      city: selectedBranch?.location?.city || "",
      state: selectedBranch?.location?.state || "",
      postalCode: selectedBranch?.location?.postal_code || "",
      country: selectedBranch?.location?.country || "",
    };

    return Object.keys(currentValues).some((key) => {
      const typedKey = key as keyof typeof currentValues; // Type assertion
      return (
        String(currentValues[typedKey]).trim() !==
        String(initialValues[typedKey]).trim()
      );
    });
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
              name: branch.name || "",
              description: branch.description || "",
              email: branch.contact_info?.email || "",
              phone: branch.contact_info?.phone_number || "",
              address: branch.location?.address || "",
              city: branch.location?.city || "",
              state: branch.location?.state || "",
              postalCode: branch.location?.postal_code || "",
              country: branch.location?.country || "",
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
  }, [restaurantId, branchId, restaurants, isFormChanged, navigate, reset]);

  useEffect(() => {
    const subscription = watch(() => {
      setAllowSave(!isFormChanged());
    });
    return () => subscription.unsubscribe();
  }, [watch, isFormChanged]);

  const handleFormSubmit = (data: FormData) => {
    // Handle form submission
    navigate(`/dashboard/restaurants`);
  };

  if (loading) {
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
        />
      </div>
    </div>
  );
};

const BranchForm = ({
  form,
  handleFormSubmit,
  allowSave,
}: {
  form: ReturnType<typeof useForm<FormData>>;
  handleFormSubmit: (data: FormData) => void;
  allowSave: boolean;
}) => (
  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="mt-6">
    <div className="space-y-8">
      <FormSection title={FORM_SECTIONS.BRANCH_DETAILS}>
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
      </FormSection>

      <FormSection title={FORM_SECTIONS.CONTACT_INFO}>
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
      </FormSection>

      <FormSection title={FORM_SECTIONS.LOCATION_INFO}>
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
