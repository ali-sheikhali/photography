import axios from "axios";

const API_URL = "https://kokoro-photo.liara.run/api/photographers";

export const deletePhotographer = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return true;
  } catch (error) {
    console.error("خطا در حذف عکاس:", error);
    throw error;
  }
};
