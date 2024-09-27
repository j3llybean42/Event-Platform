import { Button } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

export default function LandingPage() {

  return (
    <>
    <h1>Welcome!</h1>
    <Button variant="contained" href="/login" startIcon={<GoogleIcon/>}>Login to get started</Button>
    </>
  );
}
