import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Button from "@mui/material/Button";
import { getStaff } from "../utils";
import { useNavigate } from "react-router-dom";
import {StaffContext} from "../contexts/StaffContext"

export default function ViewEventsButton() {
    const navigate = useNavigate()

  function handleClick() {
        navigate("/events")
  }

  return (
    <>
      <Button onClick={() => handleClick()} variant="contained">
        Continue to events
      </Button>
    </>
  );
}
