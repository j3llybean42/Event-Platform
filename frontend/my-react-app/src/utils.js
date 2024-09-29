import axios from "axios"

const bookstoreAPI = axios.create({baseURL: "https://event-platform-jbo3.onrender.com/api"})

export function getEvents(params) {
    return bookstoreAPI.get("/events", params).then((response) => {
        return response.data
    })
}

export function getStaff(){
    return bookstoreAPI.get(`/staff`).then((response) => {
        return response.data
    })
}

export function postEvent(request){
    return bookstoreAPI.post("/events", request)
}

