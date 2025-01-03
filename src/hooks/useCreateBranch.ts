import { useState } from "react";
import { useFileUpload } from "./useFileUpload";
import { useCreateBranchMutation } from "../store/services/branchApi";
import { CreateBranchSchema } from "../types/forms/createBranch";
import { Restaurant } from "../types";
import { CreateBranch } from "../types/request";

export const useCreateBranch = () => {
  const [createBranch] = useCreateBranchMutation();
  const { uploadFiles } = useFileUpload();
  const [loading, setLoading] = useState(false);

  const createBranchOrRestaurant = async (
    selectedRestaurant: Restaurant | null,
    data: CreateBranchSchema
  ) => {
    setLoading(true);

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

      await uploadRestaurantLogo(data, createBranchData);
      await uploadBranchLogo(data, createBranchData);

      return await createBranch(createBranchData).unwrap();
    } finally {
      setLoading(false);
    }
  };

  const uploadBranchLogo = async (
    data: CreateBranchSchema,
    createBranchData: CreateBranch
  ) => {
    if (data.branch.image) {
      const fileToSingedUrlMap = await uploadFiles({}, "branch_logo", [
        data.branch.image,
      ]);
      createBranchData.branch.img_url =
        fileToSingedUrlMap[data.branch.image.name].new_file_key;
    }
  };

  const uploadRestaurantLogo = async (
    data: CreateBranchSchema,
    createBranchData: CreateBranch
  ) => {
    if (createBranchData?.restaurant && data.restaurant.image) {
      const fileToSingedUrlMap = await uploadFiles({}, "restaurant_logo", [
        data.restaurant.image,
      ]);
      createBranchData.restaurant.img_url =
        fileToSingedUrlMap[data.restaurant.image.name].new_file_key;
    }
  };

  return { createBranchOrRestaurant, loading };
};
