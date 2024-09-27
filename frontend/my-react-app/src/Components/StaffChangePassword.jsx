import { Typography, Button, CardActions, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab"
import { patchStaffPassword } from "../utils";
import { useContext, useState } from "react";
import { StaffContext } from "../contexts/StaffContext";

export default function StaffChangePassword({passwordInput, handlePasswordInput, staffDetails, isSubmitted, setIsSubmitted}){
    const {isStaff, setIsStaff} = useContext(StaffContext)
    const [success, setSuccess] = useState(false)

    function handleNewPasswordSubmit(){
        if(!passwordInput.length){
            setPasswordInputError(true)
            setIsSubmitted(false)
        }
        const staff_id = staffDetails.staff_id
        patchStaffPassword(staff_id, {new_password: passwordInput}).then(() =>{
            setIsStaff(true)
            setIsSubmitted(true)
            setSuccess(true)
        }).catch((err) => {
            setIsStaff(false)
            setIsSubmitted(false)
            setSuccess(false)
        })
    }

    return(
        <>
            <Typography variant="subtitle1">Since it's your first time logging in, you must change your password before continuing.</Typography>
            <TextField placeholder="Staff Password"
                type="password"
                id="staff_password"
                label="Staff Password"
                sx={{width: 500, paddingBottom: 2}}
                variant="outlined"
                required
                onChange={(event)=>{handlePasswordInput(event.target.value)}}
                value={passwordInput}/>
                <CardActions>
                    {isSubmitted ? (
                        <LoadingButton
                            loading
                            variant="outlined"
                            loadingIndicator="Loading..."></LoadingButton>
                    ) : (
                        <Button variant="contained" onClick={handleNewPasswordSubmit}>Confirm and Sign In</Button>
                    )}
                </CardActions>
        </>
    )
}