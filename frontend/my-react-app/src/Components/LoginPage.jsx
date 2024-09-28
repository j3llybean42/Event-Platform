import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";


export default function LoginPage() {
  async function handleLogin(googleData) {
    const url = import.meta.env.VITE_REACT_APP_API_URL
    const res = await fetch(`${url}/oauth/login`, {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: { "Content-Type": "application/json"}
    })
    const data = await res.json()
    console.log(data, "<- handleLogin data")
    localStorage.setItem('loginData', JSON.stringify(data))
  }

  // const url = import.meta.env.VITE_REACT_APP_API_URL;
  // const { handleGoogle, loading, error } = useFetch(`${url}/oauth/login`);

  // function onClickHandler(){
  //   console.log("google button clicked")
  // }

  // useEffect(() => {
  //   if (window.google) {
  //     google.accounts.id.initialize({
  //       client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
  //       callback: handleGoogle,
  //     });
  //     google.accounts.id.renderButton(document.getElementById("logindiv"), {
  //       type: "standard",
  //       size: "medium",
  //       theme: "filled_black",
  //       text: "continue_with",
  //       shape: "rectangular",
  //       click_listener: onClickHandler
  //     });
  //   }
  // }, [handleGoogle]);

  return (
    <>
      <Typography variant="h5">Login:</Typography>
      <GoogleLogin onSuccess={handleLogin} onFailure={handleLogin} buttonText="" cookiePolicy={'single_host_origin'}/>
      {/* {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : (
        <div id="loginDiv"></div>
      )} */}
    </>
  );
}
