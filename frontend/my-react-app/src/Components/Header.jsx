import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button } from "@mui/material";

export default function Header() {
  const { googleUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <h1>Bookstore Events</h1>
      {googleUser?.email ? <Button onClick={logout} variant="outlined">Logout</Button> : null}
    </>
  );
}
