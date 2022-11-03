import axios from "axios";
import { productsEndpoint } from "./endpoints";

export const addProduct = async (body)=>{
    return await axios.post(productsEndpoint,body)
}

export const getProducts = async (id=null,queryParam='')=>{
    if(id){
        return await axios.get(`${productsEndpoint}/${id}`)
    }

    if(queryParam){
        console.log('here')
      return await axios.get(`${productsEndpoint}`,{params:queryParam}) 
    }
    return await axios.get(productsEndpoint)
}

export const editProduct = async (body,id)=>{
    return await axios.put(`${productsEndpoint}/${id}`,body)
}

export const deleteProduct = async (id)=>{
    return await axios.delete(`${productsEndpoint}/${id}`)
}