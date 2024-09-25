import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LoginButton(){
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return(
        <div className="btn-container">
        </div>
    )

}