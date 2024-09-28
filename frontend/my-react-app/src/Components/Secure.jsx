import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../contexts/UserContext";
import ViewEventsButton from "./ViewEventsButton";

export default function Secure() {
  const { googleUser, setGoogleUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  async function getUserDetails(accessToken) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setUserDetails(data);
    setGoogleUser(data.email);
  }

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      navigate("/");
    }

    getUserDetails(accessToken);
  }, [navigate]);

  return (
    <>
      {userDetails ? (
            <p>Welcome, {userDetails.email}</p>
      ) : (
        <div>
          <h5>Loading...</h5>
        </div>
      )}
      <ViewEventsButton/>
    </>
  );
}
