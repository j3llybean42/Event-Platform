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

export function getStaffPassword(staff_email, params){
    return bookstoreAPI.get(`/staff/${staff_email}`, params).then((response) => {
        return response.data
    })
}