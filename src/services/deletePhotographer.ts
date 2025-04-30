import axiosInstance from "./axiosInstance";
const API_URL = "https://kokoro-photo.liara.run/api/photographers";

export const deletePhotographer = async (id: string) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("خطا در حذف عکاس:", error);
    throw error;
  }
};
