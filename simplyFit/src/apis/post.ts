import axios from "axios";

const url = "http://localhost:3000/api/v1"

export const allPosts = async() => {
    try {
        const res = await axios.get(`${url}/posts`)
        if(res){
            return res;
        }
        return ;
    } catch (error) {
        
    }
}

export const updatePost = async(updatePayload: any) => {
    try {
        const res = await axios.patch(`${url}/updatePost` , updatePayload)
        if(res){
            console.log(res)
        }
        return res;
    } catch (error) {
        
    }
}

export const savePost = async(postPayload: any) => {
    try {
        const res = await axios.post(`${url}/savePost` , postPayload)
        if(res){
            console.log(res)
        }
        return res;
    } catch (error) {
        
    }
}