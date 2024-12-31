import React, { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ArrowLeft, Upload, QrCode, Check } from "lucide-react";
import RequireAuth from "../components/auth/RequireAuth";
import Logo from "../components/common/Logo";
import RestaurantBranchSelect from "../components/qr/RestaurantBranchSelect";
import UploadMenu from "../components/qr/UploadMenu";
import PreviewStep from "../components/qr/PreviewStep";
import SuccessModal from "../components/qr/SuccessModal";
import {
  RestaurantProvider,
  useRestaurant,
} from "../contexts/RestaurantContext";
import { Restaurant, Branch } from "../types";
import { useCreateQrMenu } from "../hooks/useCreateQrMenu";
import { toast } from "react-toastify";
import { ImageData } from "../components/qr/utils/ImageData";
import LoadingScreen from "../components/common/LoadingScreen";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Select Restaurant",
    description: "Choose restaurant and branch",
    icon: QrCode,
  },
  {
    number: 2,
    title: "Upload Menu",
    description: "Upload your menu image",
    icon: Upload,
  },
  {
    number: 3,
    title: "Preview",
    description: "Review and publish",
    icon: Check,
  },
];

const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <nav aria-label="Progress">
    <ol role="list" className="flex items-center">
      {steps.map((step, stepIdx) => (
        <li
          key={step.title}
          className={`${
            stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""
          } relative`}
        >
          <div className="flex items-center">
            <div
              className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                step.number <= currentStep
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <step.icon className="h-5 w-5" aria-hidden="true" />
            </div>

            {/* Only show the connecting line if the step has been completed or is current */}
            {stepIdx !== steps.length - 1 && (
              <div
                className={`absolute left-8 top-4 h-0.5 w-full ${
                  step.number < currentStep ? "bg-indigo-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>

          {/* Step title and description */}
          <div className="mt-3">
            <p
              className={`text-sm font-medium ${
                step.number <= currentStep ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              {step.title}
            </p>
            <p className="text-sm text-gray-500">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  </nav>
);

const GenerateQR = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { restaurantId, branchId } = useParams();
  const { restaurants } = useRestaurant();
  const { createMenu, loading } = useCreateQrMenu();

  const [currentStep, setCurrentStep] = useState(() => {
    return restaurantId && branchId ? 2 : 1;
  });

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(() => {
      if (restaurantId) {
        return restaurants.find((r) => r.id === restaurantId) || null;
      }
      return null;
    });

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(() => {
    if (restaurantId && branchId && selectedRestaurant) {
      return (
        selectedRestaurant?.branches?.find((b) => b.id === branchId) || null
      );
    }
    return null;
  });

  const [uploadedFiles, setUploadedFiles] = useState<ImageData[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [menuId, setMenuId] = useState<string>("");

  const isAddMenu = searchParams.get("type") === "menu" || !!restaurantId;

  useEffect(() => {
    if (restaurantId && branchId) {
      const restaurant = restaurants.find((r) => r.id === restaurantId);
      if (restaurant) {
        const branch = restaurant?.branches?.find((b) => b.id === branchId);
        if (branch) {
          setSelectedRestaurant(restaurant);
          setSelectedBranch(branch);
          setCurrentStep(2);
        }
      }
    }
  }, [restaurantId, branchId, restaurants]);

  const handleRestaurantBranchSelect = (
    restaurant: Restaurant,
    branch: Branch
  ) => {
    setSelectedRestaurant(restaurant);
    setSelectedBranch(branch);
    setCurrentStep(2);
  };

  const handleMenuUpload = (imagesData: ImageData[]) => {
    setUploadedFiles(imagesData);
    setCurrentStep(3);
  };

  const handlePublish = async () => {
    if (!uploadedFiles.length) {
      toast.error("No file uploaded.");
      return;
    }

    if (!selectedBranch) {
      toast.error("No branch selected.");
      return;
    }

    try {
      const result = await createMenu(selectedBranch, uploadedFiles);

      if (result?.success) {
        setMenuId(result.data.id);
        setShowSuccessModal(true);
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
    }
  };

  const handleClose = () => {
    navigate("/dashboard/restaurants");
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else if (restaurantId && branchId) {
      navigate("/dashboard/restaurants");
    } else {
      navigate(-1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RestaurantBranchSelect
            onSelect={handleRestaurantBranchSelect}
            selectedRestaurant={selectedRestaurant}
            selectedBranch={selectedBranch}
          />
        );
      case 2:
        return selectedRestaurant && selectedBranch ? (
          <UploadMenu
            restaurant={selectedRestaurant}
            branch={selectedBranch}
            onUpload={handleMenuUpload}
          />
        ) : null;
      case 3:
        return selectedRestaurant && selectedBranch ? (
          <PreviewStep
            restaurant={selectedRestaurant}
            branch={selectedBranch}
            imagesData={uploadedFiles}
            onSubmit={handlePublish}
            onBack={() => setCurrentStep(2)}
          />
        ) : null;
      default:
        return null;
    }
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
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="mr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <QrCode className="h-6 w-6 text-gray-400" />
                <h1 className="text-lg font-semibold text-gray-900">
                  {isAddMenu ? "Add Menu" : "Generate QR Code"}
                </h1>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-6 sm:px-6">
            {/* Progress Steps */}
            <div className="mb-8">
              <StepIndicator currentStep={currentStep} />
            </div>

            {/* Step Content */}
            <div className="mt-8">{renderStepContent()}</div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleClose}
        menuId={menuId}
      />
    </div>
  );
};

// Wrap with both RequireAuth and RestaurantProvider
const ProtectedGenerateQR = () => (
  <RequireAuth>
    <RestaurantProvider>
      <GenerateQR />
    </RestaurantProvider>
  </RequireAuth>
);

export default ProtectedGenerateQR;
