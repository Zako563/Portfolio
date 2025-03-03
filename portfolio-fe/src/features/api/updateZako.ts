import axiosInstance from "../../Shared/Api/axiosInstance";
import { zakoRequestModel } from "../model/zakoRequestModel";
import { zakoResponseModel } from "../model/zakoResponseModel";

export const updateZako = async (
    zakoId: string,
    zako: zakoRequestModel
  ): Promise<void> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    await axiosInstance.put<void>(`${backendUrl}/api/v1/zako/${zakoId}`, zako);
  };
  
  export const getZako = async (zakoId: string): Promise<zakoResponseModel> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await axiosInstance.get<zakoResponseModel>(
      `${backendUrl}/api/v1/zako/${zakoId}`
    );
    return response.data;
  };
  