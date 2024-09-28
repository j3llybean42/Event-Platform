import LandingPage from "./LandingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import EventsPage from "./EventsPage";
import EventAdder from "./EventAdder";
import { useEffect, useState, useContext } from "react";
import LoginPage from "./LoginPage";
import { UserContext } from "../contexts/UserContext";
import Secure from "./Secure";
import { StaffContext } from "../contexts/StaffContext";
import { getEvents } from "../utils"

export default function Manager({userDetails, setUserDetails}) {
  const [eventsList, setEventsList] = useState([])
  const {googleUser, setGoogleUser} = useContext(UserContext)
  const {isStaff} = useContext(StaffContext)

  useEffect(() => {
    console.log(isStaff, "<- isStaff MANAGER")
    getEvents().then((data) => {
        const {events} = data
        setEventsList(events)
    })
}, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/secure" element={<Secure userDetails={userDetails} setUserDetails={setUserDetails}/>}/>
        <Route path="/events" element={<EventsPage eventsList={eventsList} setEventsList={setEventsList}/>}/>
        <Route path="/events/addevent" element={<EventAdder setEventsList={setEventsList}/>}/>
      </Routes>
    </>
  );
}
