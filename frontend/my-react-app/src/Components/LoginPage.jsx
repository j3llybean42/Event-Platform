import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import { Typography } from "@mui/material"

export default function LoginPage(){
    const url = import.meta.env.VITE_REACT_APP_API_URL
    const {handleGoogle, loading, error} = useFetch(`${url}/login`)

    useEffect(() => {
        if(window.google){
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogle
            })
            google.accounts.id.renderButton(document.getElementById("logindiv"), {
                theme: "filled_black",
                text: "signin_with",
                shape:"pill"
            })
        }
    }, [handleGoogle])

    return(
        <>
            <Typography variant="h3">Login:</Typography>
            {error && <p style={{color: "red"}}>{error}</p>}
            {loading ? <Typography variant="body1">Loading...</Typography> : <div id="loginDiv"></div>}
        </>
    )
}