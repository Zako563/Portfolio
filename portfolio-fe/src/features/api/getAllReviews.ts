import axiosInstance from '../../Shared/Api/axiosInstance'; // Adjust the relative path
import { reviewResponseModel } from '../model/reviewResponseModel';


export const getAllReviews = async (): Promise<reviewResponseModel[]> => {
  // Use menuResponseModel[] directly in the get call
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await axiosInstance.get<reviewResponseModel[]>(
    `${backendUrl}/api/v1/review`
  );
  return response.data;
};
