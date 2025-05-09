import axiosInstance from "./axiosInstance";
const API_URL = "https://kokoro-photo.liara.run/api/admin/login";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${API_URL}`, {
      username: email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getToken = () => {
  return localStorage.getItem("token");
};
