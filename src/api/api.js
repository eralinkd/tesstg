import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

export const api = axios.create({
    baseURL: baseURL
})

export const getHTMLChannel = async (id) => { 
    return await api.get(`/html/get/@${id}`)
}