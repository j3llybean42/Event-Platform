import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export default function EventsPage(){
    const {googleUser} = useContext(UserContext)

    return(
        <>
        <h3>events</h3>
        </>
    )
}