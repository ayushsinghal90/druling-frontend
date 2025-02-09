import { useGetAllFeaturesQuery } from "../store/services/featureApi";
// import { useDispatch } from "react-redux";
// import { setProfileFeatures } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { ProfileFeature } from "../types";
import { getStoredProfileFeatures } from "../utils/auth";

export const useProfileFeature = () => {
  const {data: profileFeatureData} = useGetAllFeaturesQuery();
  // const dispatch = useDispatch();

  const setProfileFeature = async () => {
    try {
      if (profileFeatureData?.success) {
        const data: ProfileFeature[] = profileFeatureData?.data;
        // dispatch(
        //     setProfileFeatures(data)
        //   );
        return data;
      }
    } catch {
      toast.error("Profile feature update Failed");
    }
  };

  const getProfileFeatures = async (): Promise<ProfileFeature[] | undefined> => { 
    // let features = getStoredProfileFeatures();

    // if (!features) {
      
    // }

    // features = getStoredProfileFeatures();
    return await setProfileFeature();;
  };

  const checkFeature = async (featureType: string): Promise<boolean> => {
    const features = await getProfileFeatures();
    if (features) {
      const feature = features.find((f) => f.type === featureType);

      return feature ? feature.is_active && feature.usage < feature.limit : false;
    }
    return false;
  }

  return {  getStoredProfileFeatures, checkFeature };
};
