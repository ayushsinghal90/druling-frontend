import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RequireAuth from "../components/auth/RequireAuth";
import Logo from "../components/Logo";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/TextArea";
import { FormStepsSidebar } from "../components/form/FormStepsSideBar";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import { StepHeader } from "../components/form/StepHeader";
import {
  ImageIcon,
  Save,
  ChevronDown,
  Plus,
  ArrowLeft,
  Building2,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { CreateBranch } from "../types/request";
import { useCreateBranchMutation } from "../store/services/branchApi";
import LoadingScreen from "../components/common/LoadingScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Constants
const FORM_STEPS = ["Restaurant", "Branch & Contact", "Location"];
const DEFAULT_VALUES = {
  restaurant: {
    name: "",
    image: null,
    description: "",
  },
  branch: {
    name: "",
    manager: "",
    description: "",
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
};

// Define schema for form validation
const formSchema = z.object({
  restaurant: z.object({
    name: z.string().min(1, "Restaurant name is required"),
    image: z.instanceof(File).nullable(),
    description: z.string().optional(),
  }),
  branch: z.object({
    name: z.string().min(1, "Branch name is required"),
    manager: z.string().optional(),
    description: z.string().optional(),
  }),
  contact: z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
  }),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

type FormData = z.infer<typeof formSchema>;

interface Restaurant {
  id: string;
  name: string;
}

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [open, setOpen] = useState(false);

  const { currentStep, next, previous, isLastStep, isFirstStep, goTo } =
    useMultiStepForm(FORM_STEPS, restaurantId ? 1 : 0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
    criteriaMode: "all",
  });

  const [createBranch, { isLoading }] = useCreateBranchMutation();
  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("restaurant.image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const createBranchData: CreateBranch = {
        restaurant: {
          name: data.restaurant.name,
          description: data.restaurant.description,
        },
        branch: {
          name: data.branch.name,
          manager: data.branch.manager,
          description: data.branch.description,
        },
        contact: {
          email: data.contact.email,
          phone_number: data.contact.phone,
        },
        location: {
          address: data.location.address,
          city: data.location.city,
          state: data.location.state,
          postal_code: data.location.postalCode,
          country: data.location.country,
        },
      };

      const result = await createBranch(createBranchData).unwrap();

      if (result?.success) {
        navigate("/dashboard/restaurants");
      } else {
        const errorMessage =
          typeof result?.message === "string"
            ? result.message
            : "An unexpected error occurred.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const fieldsToValidate =
      currentStep === 0
        ? (["restaurant.name"] as const)
        : currentStep === 1
        ? (["branch.name", "contact.email", "contact.phone"] as const)
        : ([
            "location.address",
            "location.city",
            "location.state",
            "location.postalCode",
            "location.country",
          ] as const);

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      next();
    }
  };

  const restaurants: Restaurant[] = [
    { id: "1", name: "Restaurant 1" },
    { id: "2", name: "Restaurant 2" },
    // ... more restaurants
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LogoSection />
      <div className="max-w-6xl mx-auto px-4">
        <Header restaurantId={restaurantId} />
      </div>

      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="flex max-w-6xl mx-auto py-8">
          <div className="px-4 flex-auto">
            <div className="">
              <div className="">
                <div className="w-full">
                  {currentStep === 0 && (
                    <RestaurantStep
                      restaurantId={restaurantId}
                      open={open}
                      setOpen={setOpen}
                      selectedRestaurant={selectedRestaurant}
                      setSelectedRestaurant={setSelectedRestaurant}
                      isAddingNew={isAddingNew}
                      setIsAddingNew={setIsAddingNew}
                      handleImageChange={handleImageChange}
                      previewImage={previewImage}
                      form={form}
                      restaurants={restaurants}
                    />
                  )}

                  {currentStep === 1 && <BranchContactStep form={form} />}

                  {currentStep === 2 && <LocationStep form={form} />}

                  <NavigationButtons
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    previous={previous}
                    handleNext={handleNext}
                    isSubmitting={isSubmitting}
                    form={form}
                    handleFormSubmit={handleFormSubmit}
                    restaurantId={restaurantId}
                  />
                </div>
              </div>
            </div>
          </div>

          <FormStepsSidebar
            steps={FORM_STEPS}
            currentStep={currentStep}
            onStepClick={(step: number) =>
              form.trigger().then((isValid) => {
                if (isValid) {
                  goTo(step);
                }
              })
            }
          />
        </div>
      </form>
    </div>
  );
};

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

const Header = ({ restaurantId }: { restaurantId: string | null }) => (
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
);

const RestaurantStep = ({
  restaurantId,
  open,
  setOpen,
  selectedRestaurant,
  setSelectedRestaurant,
  isAddingNew,
  setIsAddingNew,
  handleImageChange,
  previewImage,
  form,
  restaurants,
}: {
  restaurantId: string | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: React.Dispatch<
    React.SetStateAction<Restaurant | null>
  >;
  isAddingNew: boolean;
  setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewImage: string;
  form: ReturnType<typeof useForm<FormData>>;
  restaurants: Restaurant[];
}) => (
  <div className="space-y-6 border-b border-gray-200 p-8 bg-white rounded-lg shadow-sm">
    <StepHeader
      header="Restaurant Information"
      description="Select an existing restaurant or create a new one."
    />

    {!restaurantId && (
      <div className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedRestaurant
                ? selectedRestaurant.name
                : "Select restaurant..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search restaurants..." />
              <CommandEmpty>No restaurant found.</CommandEmpty>
              <CommandGroup>
                {restaurants.map((restaurant) => (
                  <CommandItem
                    key={restaurant.id}
                    onSelect={() => {
                      setSelectedRestaurant(restaurant);
                      setOpen(false);
                      setIsAddingNew(false);
                    }}
                  >
                    {restaurant.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-200" />
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        <Button
          type="button"
          variant="outline"
          className={` ${isAddingNew ? "hidden" : "w-full"}`}
          onClick={() => {
            setIsAddingNew(true);
            setSelectedRestaurant(null);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Restaurant
        </Button>
      </div>
    )}

    {(isAddingNew || restaurantId) && (
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="w-1/3 md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Image
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
                  <p className="mt-1 text-sm text-gray-500">Click to upload</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
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
          <Input
            label="Restaurant Name"
            placeholder="The Great Eatery"
            required
            {...form.register("restaurant.name")}
            error={form.formState.errors.restaurant?.name?.message}
          />
          <Textarea
            label="Restaurant Description"
            placeholder="A cozy place with a variety of dishes..."
            {...form.register("restaurant.description")}
            error={form.formState.errors.restaurant?.description?.message}
          />
        </div>
      </div>
    )}
  </div>
);

const BranchContactStep = ({
  form,
}: {
  form: ReturnType<typeof useForm<FormData>>;
}) => (
  <div className="space-y-6">
    <div className="border-b border-gray-200 p-8 bg-white rounded-lg shadow-sm">
      <StepHeader
        header="Branch Information"
        description="Add details about the branch information."
      />
      <div className="space-y-4">
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
    <div className="border-b border-gray-200 p-8 bg-white rounded-lg shadow-sm">
      <StepHeader
        header="Contact Information"
        description="Add details about the branch contact information."
      />
      <div className="space-y-4">
        <Input
          label="Contact Email"
          type="email"
          placeholder="contact@branch.com"
          required
          {...form.register("contact.email")}
          error={form.formState.errors.contact?.email?.message}
        />
        <Input
          label="Contact Phone"
          type="tel"
          placeholder="+1 234 567 890"
          required
          {...form.register("contact.phone")}
          error={form.formState.errors.contact?.phone?.message}
        />
      </div>
    </div>
  </div>
);

const LocationStep = ({
  form,
}: {
  form: ReturnType<typeof useForm<FormData>>;
}) => (
  <div className="space-y-6 border-b border-gray-200 p-8 bg-white rounded-lg shadow-sm">
    <StepHeader
      header="Location Information"
      description="Add location details for the branch."
    />
    <div className="space-y-4">
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
    </div>
  </div>
);

const NavigationButtons = ({
  isFirstStep,
  isLastStep,
  previous,
  handleNext,
  isSubmitting,
  form,
  handleFormSubmit,
  restaurantId,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  previous: () => void;
  handleNext: () => void;
  isSubmitting: boolean;
  form: ReturnType<typeof useForm<FormData>>;
  handleFormSubmit: (data: FormData) => void;
  restaurantId: string | null;
}) => (
  <div className="mt-6 flex justify-end gap-3">
    {!isFirstStep && (
      <Button type="button" variant="outline" onClick={previous}>
        Previous
      </Button>
    )}

    <Button
      type="button"
      onClick={handleNext}
      className={`${isLastStep ? "hidden" : ""}`}
    >
      Next
    </Button>

    <Button
      className={`${isLastStep ? "" : "hidden"}`}
      type="submit"
      isLoading={isSubmitting}
      onClick={(e) => {
        e.preventDefault();
        form.handleSubmit(handleFormSubmit)();
      }}
    >
      <Save className="h-4 w-4 mr-2" />
      {restaurantId ? "Add Branch" : "Create Restaurant"}
    </Button>
  </div>
);

// Wrap with RequireAuth HOC
const ProtectedAddRestaurant = () => (
  <RequireAuth>
    <AddRestaurant />
  </RequireAuth>
);

export default ProtectedAddRestaurant;
