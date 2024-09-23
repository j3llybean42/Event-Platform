import LandingPage from "./LandingPage";
import { Routes, Route } from "react-router-dom";
import Secure from "./Secure";
import EventsPage from "./EventsPage";
import EventAdder from "./EventAdder";
import { useState } from "react";

export default function Manager() {
  const [eventsList, setEventsList] = useState([])

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/secure" element={<Secure />} />
        <Route path="/events" element={<EventsPage eventsList={eventsList} setEventsList={setEventsList}/>}/>
        <Route path="/events/addevent" element={<EventAdder setEventsList={setEventsList}/>}/>
      </Routes>
    </>
  );
}
