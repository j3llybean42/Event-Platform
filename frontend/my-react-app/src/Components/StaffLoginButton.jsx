import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function StaffLoginButton(){
    const navigate = useNavigate()
    
    function handleClick(){
        navigate("/stafflogin")
    }

    return(
        <>
        <Button onClick={() => handleClick()} variant="contained">
        Sign in as Staff
      </Button>
        </>
    )

}