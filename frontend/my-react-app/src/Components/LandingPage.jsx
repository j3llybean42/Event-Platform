import { Typography } from "@mui/material";
import StaffLoginButton from "./StaffLoginButton";
import ViewEventsButton from "./ViewEventsButton";


export default function LandingPage() {
  return (
    <>
    <h1>Welcome!</h1>
    <ViewEventsButton/> 
    <StaffLoginButton/>
    </>
  );
}
