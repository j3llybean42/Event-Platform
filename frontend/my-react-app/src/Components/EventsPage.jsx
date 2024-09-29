import { useContext} from "react"
import {StaffContext} from "../contexts/StaffContext"
import EventCard from "./EventCard"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function EventsPage({eventsList, setEventsList}){
    const navigate = useNavigate()
    const {isStaff} = useContext(StaffContext)
    
    

    function handleClick(){
        navigate("/events/addevent")
    }

    return(
        <>
        <h2>Upcoming Events:</h2>
        {isStaff ? (<Button onClick={handleClick} variant="contained" size="small" className="button-right">Add new event</Button>) : null }
        {eventsList.map((event, index) => {
            return <EventCard key={index} event={event}/>
        })}
        </>
    )
}