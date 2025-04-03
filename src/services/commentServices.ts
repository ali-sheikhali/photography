import axios from "axios";

const API_URL = "https://kokoro.liara.run/api/comments"

export const submitComment = async (data:{text:string , photographerId:string , name:string})=>{

    try{
        const response = await axios.post(API_URL , data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        return response.data;
    } catch (error) {
        console.error("Error submitting photographer:", error);
        throw error;
    }
}