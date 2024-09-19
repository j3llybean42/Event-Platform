import LandingPage from "./LandingPage";
import { Routes, Route } from "react-router-dom";
import Secure from "./Secure";
import EventsPage from "./EventsPage";

export default function Manager() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/secure" element={<Secure />} />
        <Route path="/events" element={<EventsPage/>}/>
      </Routes>
    </>
  );
}
