import axios from "axios";

const API_URL = "https://kokoro-photo.liara.run/api/photos";

export const fetchPhoto = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photographers:", error);
    throw error;
  }
};
