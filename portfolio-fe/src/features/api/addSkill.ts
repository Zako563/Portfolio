import { AxiosResponse } from "axios";
import axiosInstance from '../../Shared/Api/axiosInstance';
import { skillRequestModel } from "../model/projectResponseModel";

export const addSkill = async (
    skill: skillRequestModel
  ): Promise<AxiosResponse<void>> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      return await axiosInstance.post<void>(
        `${backendUrl}/api/v1/skill`,
        skill
      );
    } catch (error) {
      throw new Error(`Failed to review dish: ${error}`);
    }
  };
  