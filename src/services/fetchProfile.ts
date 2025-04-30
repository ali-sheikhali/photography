import axiosInstance from "./axiosInstance";
const API_URL = "https://kokoro-photo.liara.run/api/admin/profile";

export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching photographers:", error);
    throw error;
  }
};
