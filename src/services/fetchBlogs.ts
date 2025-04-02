import axios from "axios";

const API_URL = "https://kokoro.liara.run/api/blogs"

export const fetchBlogs = async ()=>{
    try{
        const response = await axios.get(API_URL , {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },  
        })
        return response.data
    }catch(error){
        console.error(error.message);        
    }
}