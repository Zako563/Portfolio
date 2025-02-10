import axiosInstance from '../../Shared/Api/axiosInstance';

export const sendEmail = async (emailData: { subject: string, body: string }): Promise<void> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  try {
    await axiosInstance.post(`${backendUrl}/email/send-email`, emailData);  // Adjust the URL to match your backend endpoint.
  } catch (error) {
    throw new Error('Failed to send email');
  }
};
