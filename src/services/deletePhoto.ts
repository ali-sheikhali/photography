import axios from "axios";

const API_URL = "https://kokoro.liara.run/api/photos";

export const deletePhoto = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return true;
  } catch (error) {
    console.error("خطا در حذف عکاس:", error.response?.data || error.message);
    throw error;
  }
};
