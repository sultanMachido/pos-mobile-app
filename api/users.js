import axios from 'axios'
import { usersEndpoint } from './endpoints'

export const logUserIn = async(body)=>{
     return await axios.post(usersEndpoint,body)
}

export const createUser = async(body)=>{
    return await axios.post(usersEndpoint,body)
}