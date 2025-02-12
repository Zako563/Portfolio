import { AxiosResponse } from "axios";
import axiosInstance from '../../Shared/Api/axiosInstance';
import { reviewRequestModel } from "../model/reviewRequestModel";

export const addReview = async (
    review: reviewRequestModel
  ): Promise<AxiosResponse<void>> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      return await axiosInstance.post<void>(
        `${backendUrl}/api/v1/review`,
        review
      );
    } catch (error) {
      throw new Error(`Failed to review dish: ${error}`);
    }
  };
  