import axiosInstance from '../../Shared/Api/axiosInstance'; // Adjust the relative path
import { projectResponseModel } from '../model/projectResponseModel';


export const getAllProjects = async (): Promise<projectResponseModel[]> => {
  // Use menuResponseModel[] directly in the get call
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await axiosInstance.get<projectResponseModel[]>(
    `${backendUrl}/api/v1/project`
  );
  return response.data;
};
