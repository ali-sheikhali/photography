import axios from "axios";

const API_URL = "https://kokoro.liara.run/api/blogs"

export const submitBlog = async (data:{title:string , image:string , description:string })=>{

    try{
        const response = await axios.post(API_URL,data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },

        })

        return response.data
    }catch(error){
        console.error(error.message);
        
    }
}