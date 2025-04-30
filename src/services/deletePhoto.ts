import axiosInstance from "./axiosInstance";
const API_URL = "https://kokoro-photo.liara.run/api/photos";

export const deletePhoto = async (id: string) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
