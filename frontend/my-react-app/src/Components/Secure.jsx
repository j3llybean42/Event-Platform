import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../contexts/UserContext";
import ViewEventsButton from "./ViewEventsButton";

export default function Secure({userDetails, setUserDetails}) {
    const navigate = useNavigate()
    const {googleUser, setGoogleUser} = useContext(UserContext)

    const getUserDetails = async (accessToken) => {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
        const data = await response.json()
        setUserDetails(data)
        setGoogleUser(data.email)
    }

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        if(!accessToken){
            navigate("/")
        }

        getUserDetails(accessToken)
        console.log(userDetails, "<- userDetails Secure")
        console.log(googleUser, "<- googleUser Secure")
    }, [navigate, googleUser])

  return (
    <>
      {userDetails ? (
            <p>Welcome!</p>
      ) : (
        <div>
          <h5>Loading...</h5>
        </div>
      )}
      <ViewEventsButton/>
    </>
  );
}
