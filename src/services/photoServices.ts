import axios from "axios";

const API_URL = "https://kokoro.liara.run/api/photos"

export const submitPhoto = async (data:{url:string , type:string , photographerId:string })=>{

    try{
        const response = await axios.post(API_URL, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        return response.data;
    } catch (error) {
        console.error("Error submitting photographer:", error.response?.data || error.message);
        throw error;
    }
}