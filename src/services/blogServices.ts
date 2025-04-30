import axiosInstance from "./axiosInstance";
const API_URL = "https://kokoro-photo.liara.run/api/blogs";

export const submitBlog = async (data: {
  title: string;
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
