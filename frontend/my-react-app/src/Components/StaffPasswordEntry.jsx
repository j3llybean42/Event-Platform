import { LoadingButton } from "@mui/lab"
import { Button, CardActions, TextField} from "@mui/material"

export default function StaffPasswordEntry({isSubmitted, passwordInput, handlePasswordInput, handleSubmit}) {
    return(
        <>
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
        </>
    )
}