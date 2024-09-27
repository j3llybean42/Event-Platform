import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { StaffContext } from "../contexts/StaffContext";
import { getStaffEmail, getStaffPassword } from "../utils";
import StaffChangePassword from "./StaffChangePassword";
import StaffPasswordEntry from "./StaffPasswordEntry";

export default function StaffLoginPage() {
  const { isStaff, setIsStaff } = useContext(StaffContext);
  const [emailInput, setEmailInput] = useState("");
  const [staffDetails, setStaffDetails] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInputError, setEmailInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstLogin, setFirstLogin] = useState(false);
  

  function handleEmailInput(input) {
    setEmailInput(input);
  }

  function handlePasswordInput(input) {
    setPasswordInput(input);
  }

  function handleEmailSubmit() {
    if (!emailInput.length) {
      setEmailInputError(true);
      setIsSubmitted(false);
    }
    getStaffEmail(emailInput)
      .then((data) => {
        const { staffMember } = data;
        console.log(staffMember, "<-staff")
        setStaffDetails(staffMember);
        if (staffMember.staff_password === "password") {
          setFirstLogin(true);
        }
      })
  }

  function handleSubmit() {
    if (!emailInput.length) {
      setEmailInputError(true);
      setIsSubmitted(false);
    }
    if (!passwordInput.length) {
      setPasswordInputError(true);
      setIsSubmitted(false);
    }
    setIsSubmitted(true);
    setError(null);
    const signInObject = {
      input_password: passwordInput,
    };
    console.log(signInObject);
    getStaffPassword(emailInput, { params: signInObject })
      .then((data) => {
        console.log(data)
        const { staff_id } = data;
        console.log(staff_id, "<-- data");
        if (staff_id) {
          setIsStaff(true);
          console.log(isStaff);
        }
      })
      .catch((err) => {
        setIsSubmitted(false);
        console.log(err);
      });
  }

  return (
    <>
      <Typography variant="h5" sx={{ paddingBottom: 2 }}>
        Staff Login
      </Typography>
      <Card>
        <Box sx={{ width: 600 }} component="form">
          <br />
          <TextField
            placeholder="Staff Email"
            sx={{ width: 500, paddingBottom: 2 }}
            id="staff_email"
            label="Staff Email"
            variant="outlined"
            required
            onChange={(event) => {
              handleEmailInput(event.target.value);
            }}
            value={emailInput}
          />
          <Button variant="contained" onClick={handleEmailSubmit}>
            Verify Email
          </Button>
          <br />
          {firstLogin ? (
            <StaffChangePassword
              passwordInput={passwordInput}
              setPasswordInputError={setPasswordInputError}
              handlePasswordInput={handlePasswordInput}
              staffDetails={staffDetails}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
            />
          ) : (
            <StaffPasswordEntry
              isSubmitted={isSubmitted}
              passwordInput={passwordInput}
              handlePasswordInput={handlePasswordInput}
              handleSubmit={handleSubmit}
            />
          )}
          {/* <TextField placeholder="Staff Password"
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
                </CardActions> */}
        </Box>
      </Card>
    </>
  );
}
