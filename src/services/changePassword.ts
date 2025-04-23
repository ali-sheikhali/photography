import axios from "axios";

const API_URL = "https://kokoro-photo.liara.run/api/admin/update";

export const submitChangePassword = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.put(API_URL, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log("response status: ", response.status);

    return response.data;
  } catch (error) {
    console.error("Error submitting photographer:", error);
    throw error;
  }
};
