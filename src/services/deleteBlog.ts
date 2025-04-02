import axios from "axios";

const API_URL = "https://kokoro.liara.run/api/blogs"


export const deleteBlog = async(id:string)=>{
    try{
         await axios.delete(`${API_URL}/${id}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },

        })
        return true
    }catch(error){
        console.error(error.message);    
    }
}