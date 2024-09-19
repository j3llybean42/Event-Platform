import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { UserContext } from "../contexts/UserContext";
import ViewEventsButton from "./ViewEventsButton";

export default function Secure(){
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({});
    const {googleUser, setGoogleUser} = useContext(UserContext)
    
    const getUserDetails = async (accessToken) => {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
        const data = await response.json()
        setUserDetails(data)
        setGoogleUser((googleUser) => {
            return googleUser = data.email
        })
    }

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        if(!accessToken){
            navigate("/")
        }

        getUserDetails(accessToken)
        console.log(userDetails, "<- userDetails")
        console.log(googleUser, "<- googleUser")
    }, [navigate, googleUser])

    return(
        <>
            <h2>Welcome {userDetails.email}!</h2>
            <ViewEventsButton />
        </>
    )

}