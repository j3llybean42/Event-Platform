import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [googleUser, setGoogleUser] = useState({})
    return(
        <UserContext.Provider value={{googleUser, setGoogleUser}}>
            {children}
        </UserContext.Provider>
    )
}

