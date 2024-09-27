import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ViewEventsButton() {
    const navigate = useNavigate()

  function handleClick() {
        navigate("/events")
  }

  return (
    <>
      <Button onClick={() => handleClick()} variant="contained" >
        Continue to events
      </Button>
    </>
  );
}
