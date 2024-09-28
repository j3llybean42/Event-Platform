import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button } from "@mui/material";
import Cookies from "js-cookie";

export default function Header() {
  const { googleUser } = useContext(UserContext);

  // const logout = () => {
  //   Cookies.remove("access_token")
  //   window.location.reload();
  // };

  return (
    <>
      <h1>Bookstore Events</h1>
      {/* {googleUser ? <Button onClick={logout} variant="outlined">Logout</Button> : null} */}
    </>
  );
}
