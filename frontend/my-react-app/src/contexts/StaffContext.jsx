import { createContext, useState } from "react";

export const StaffContext = createContext()

export const StaffProvider = ({children}) => {
    const [isStaff, setIsStaff] = useState(false)
    return(
        <StaffContext.Provider value={{isStaff, setIsStaff}}>
            {children}
        </StaffContext.Provider>
    )
}