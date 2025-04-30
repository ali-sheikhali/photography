import axiosInstance from "./axiosInstance";
const API_URL = "https://kokoro-photo.liara.run/api/about";

export const submitAbout = async (data: {
  image: string;
  description: string;
}) => {
  try {
    const response = await axiosInstance.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
