import LandingPage from "./LandingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import EventsPage from "./EventsPage";
import EventAdder from "./EventAdder";
import { useEffect, useState, useContext } from "react";
import LoginPage from "./LoginPage";
import { UserContext } from "../contexts/UserContext";

export default function Manager() {
  const [eventsList, setEventsList] = useState([])
  const {googleUser, setGoogleUser} = useContext(UserContext)

  useEffect(()  => {
    const theUser = localStorage.getItem("user")

    if(theUser && !theUser.includes("undefined")){
      setGoogleUser(JSON.parse(theUser))
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={googleUser?.email ? <Navigate to="/events"/> :<LoginPage/>}/>
        <Route path="/events" element={<EventsPage eventsList={eventsList} setEventsList={setEventsList}/>}/>
        <Route path="/events/addevent" element={<EventAdder setEventsList={setEventsList}/>}/>
      </Routes>
    </>
  );
}
