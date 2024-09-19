import axios from "axios"

const bookstoreAPI = axios.create({baseURL: "https://event-platform-jbo3.onrender.com/api"})

export function getEvents(params){}

export function getStaff(){
    return bookstoreAPI.get(`/staff`).then((response) => {
        return response.data
    })
}