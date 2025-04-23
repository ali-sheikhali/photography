import axios from "axios";

const API_URL = "https://kokoro-photo.liara.run/api/about";

export const submitAbout = async (data: {
  image: string;
  description: string;
}) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
