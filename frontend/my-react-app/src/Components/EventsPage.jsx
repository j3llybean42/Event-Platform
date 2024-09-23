import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import {StaffContext} from "../contexts/StaffContext"
import { getEvents } from "../utils"
import EventCard from "./EventCard"
import { Button } from "@mui/material"

export default function EventsPage({eventsList, setEventsList}){
    const {isStaff} = useContext(StaffContext)
    

    useEffect(() => {
        getEvents().then((data) => {
            const {events} = data
            setEventsList(events)
        })
    }, [])


    return(
        <section>
        <h2>Upcoming Events:</h2>
        {isStaff ? (<Button href={"/events/addevent"} variant="outlined">Add new event</Button>) : null }
        {eventsList.map((event) => {
            return <EventCard key={event.event_id} event={event}/>
        })}
        </section>
    )
}