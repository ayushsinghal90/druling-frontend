import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RequireAuth from "../components/auth/RequireAuth";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { FormStepsSidebar } from "../components/form/FormStepsSidebar";
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

const formSchema = z.object({
  restaurant: z.object({
    name: z.string().min(1, "Restaurant name is required"),
    image: z.instanceof(File).nullable(),
    description: z.string().optional(),
  }),
  branch: z.object({
    name: z.string().min(1, "Branch name is required"),
    manager: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
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

  const steps = ["Restaurant", "Branch & Contact", "Location"];
  const { currentStep, next, previous, isLastStep, isFirstStep, goTo } =
    useMultiStepForm(steps, restaurantId ? 1 : 0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    mode: "onTouched",
    criteriaMode: "firstError",
  });

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

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      // Add your API call here
      console.log("Form data:", data);
      navigate("/dashboard/restaurants");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onNext = async () => {
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

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex max-w-6xl mx-auto py-8">
          <div className="px-4 flex-auto">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200 px-4 pb-4 sm:px-6">
                <div className="w-full p-6">
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <StepHeader
                        header="Restaurant Information"
                        description="Select an existing restaurant or create a new one."
                      />

                      {!restaurantId && (
                        <div className="space-y-4 border-b border-gray-200 px-4 pb-4 sm:px-6">
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
                                <CommandEmpty>
                                  No restaurant found.
                                </CommandEmpty>
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
                            <span className="px-4 text-sm text-gray-500">
                              or
                            </span>
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
                                    <p className="mt-1 text-sm text-gray-500">
                                      Click to upload
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      PNG, JPG up to 10MB
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
                            <Input
                              label="Restaurant Name"
                              placeholder="The Great Eatery"
                              required
                              {...form.register("restaurant.name")}
                              error={
                                form.formState.errors.restaurant?.name?.message
                              }
                            />
                            <Textarea
                              label="Restaurant Description"
                              placeholder="A cozy place with a variety of dishes..."
                              {...form.register("restaurant.description")}
                              error={
                                form.formState.errors.restaurant?.description
                                  ?.message
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-6">
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
                          error={
                            form.formState.errors.branch?.description?.message
                          }
                        />
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
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
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
                          error={
                            form.formState.errors.location?.address?.message
                          }
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
                          error={
                            form.formState.errors.location?.postalCode?.message
                          }
                        />
                        <Input
                          label="Country"
                          placeholder="United States"
                          required
                          {...form.register("location.country")}
                          error={
                            form.formState.errors.location?.country?.message
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end gap-3">
                    {!isFirstStep && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={previous}
                      >
                        Previous
                      </Button>
                    )}

                    <Button
                      type="button"
                      onClick={onNext}
                      className={`${isLastStep ? "hidden" : ""}`}
                    >
                      Next
                    </Button>

                    <Button
                      className={`${isLastStep ? "" : "hidden"}`}
                      type="submit"
                      isLoading={isSubmitting}
                      onClick={(e) => {
                        // Prevent default form submission on last step
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {restaurantId ? "Add Branch" : "Create Restaurant"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FormStepsSidebar
            steps={steps}
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

// Wrap with RequireAuth HOC
const ProtectedAddRestaurant = () => (
  <RequireAuth>
    <AddRestaurant />
  </RequireAuth>
);

export default ProtectedAddRestaurant;
