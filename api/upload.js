import axios from 'axios'
import { imageUploadEndpoint } from './endpoints'

export const uploadImage = async(body)=>{
    return await axios.post(imageUploadEndpoint,body,{
        headers:{
        'Content-Type':'multipart/form-data'
    }
})
}