import { useState } from "react";
import { useFileUpload } from "./useFileUpload";
import {
  useCreateBranchMutation,
  useUpdateBranchMutation,
} from "../store/services/branchApi";
import { CreateBranchSchema, EditBranchSchema } from "../types/forms/schemas";
import { Branch, Restaurant } from "../types";
import { CreateBranch, UpdateBranch } from "../types/request";

export const useCreateBranch = () => {
  const [createBranch] = useCreateBranchMutation();
  const { uploadFiles } = useFileUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [updateBranch] = useUpdateBranchMutation();

  const createBranchOrRestaurant = async (
    selectedRestaurant: Restaurant | null,
    data: CreateBranchSchema
  ) => {
    setIsLoading(true);

    try {
      const createBranchData: CreateBranch = {
        ...(selectedRestaurant
          ? { restaurant_id: selectedRestaurant?.id }
          : {
              restaurant: {
                name: data.restaurant.name,
                description: data.restaurant.description,
              },
            }),
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

      await uploadRestaurantLogo(
        data?.restaurant?.image,
        createBranchData.restaurant
      );
      await uploadBranchLogo(data?.branch?.image, createBranchData.branch);

      return await createBranch(createBranchData).unwrap();
    } finally {
      setIsLoading(false);
    }
  };

  const editBranch = async (
    selectedBranch: Branch | null,
    data: EditBranchSchema
  ) => {
    setIsLoading(true);

    try {
      const updateBranchData: UpdateBranch = {
        branch: {
          name: data.branch.name,
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

      await uploadBranchLogo(data.branch.image, updateBranchData?.branch);

      return await updateBranch({
        id: selectedBranch?.id || "",
        data: updateBranchData,
      }).unwrap();
    } finally {
      setIsLoading(false);
    }
  };

  const uploadBranchLogo = async (image: File | null, branch: Branch) => {
    if (image) {
      const fileToSingedUrlMap = await uploadFiles({}, "branch_logo", [image]);
      branch.img_url = fileToSingedUrlMap[image.name].new_file_key;
    }
  };

  const uploadRestaurantLogo = async (
    image: File | null,
    restaurant?: Restaurant
  ) => {
    if (restaurant && image) {
      const fileToSingedUrlMap = await uploadFiles({}, "restaurant_logo", [
        image,
      ]);
      restaurant.img_url = fileToSingedUrlMap[image.name].new_file_key;
    }
  };

  return { createBranchOrRestaurant, editBranch, isLoading };
};
