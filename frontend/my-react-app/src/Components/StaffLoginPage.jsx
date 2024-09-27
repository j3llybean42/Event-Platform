import { LoadingButton } from "@mui/lab"
import { Box, Button, Card, CardActions, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { StaffContext } from "../contexts/StaffContext"
import { getStaffPassword } from "../utils"

export default function StaffLoginPage() {
    const {isStaff, setIsStaff} = useContext(StaffContext)
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [emailInputError, setEmailInputError] = useState(false)
    const [passwordInputError, setPasswordInputError] = useState(false)
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleEmailInput(input){
        setEmailInput(input)
    }

    function handlePasswordInput(input){
        setPasswordInput(input)
    }

    function handleSubmit(){
        if(!emailInput.length){
            setEmailInputError(true)
            setIsSubmitted(false)
        }
        if(!passwordInput.length){
            setPasswordInputError(true)
            setIsSubmitted(false)
        }
        setIsSubmitted(true)
        setError(null)
        const signInObject = {
            input_password: passwordInput
        }
        getStaffPassword(emailInput, signInObject).then((data) => {
            const {staff_id} = data
            if(staff_id){
                setIsStaff(true)
                console.log(isStaff)
            }
        }).catch((err) => {
            setIsSubmitted(false)
            console.log(err)
        })

    }

    return(
        <>
        <Typography variant="h5">Staff Login</Typography>
        <Card>
            <Box  sx={{width: 600}} component="form">
                <br/>
                <TextField placeholder="Staff Email"
                sx={{width: 500, paddingBottom: 2}}
                id="staff_email"
                label="Staff Email"
                variant="outlined"
                required
                onChange={(event)=>{handleEmailInput(event.target.value)}}
                value={emailInput}/>
                <br/>
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
                            loadingIndicator="Signing In..."></LoadingButton>
                    ) : (
                        <Button variant="contained" onClick={handleSubmit}>Sign In</Button>
                    )}
                </CardActions>
            </Box>
        </Card>
        </>
    )
}