import axios from "axios";
import { string } from "yup";

const API_URL = "https://kokoro.liara.run/api/photographers";

export const submitPhotographer = async(data:{image:string , name:string , genre:string })=>{
    try {
        const response = await axios.post(API_URL, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("status: " , response.status);
        
        return response.data;
    } catch (error) {
        console.error("Error submitting photographer:", error.response?.data || error.message);
        throw error;
    }

}