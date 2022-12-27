import { createContext, useState } from "react";
import { getProfileFromLS, getTokenFromLS } from "../actionLocal/ActionLocal";

const checkPrivateRouter = {
    checkPrivate: Boolean(getTokenFromLS()),
    setCheckPrivate: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null, 
}


export const AppContext = createContext(checkPrivateRouter)

export const PrivateRoute = ({children}) => {
    const [checkPrivate, setCheckPrivate] = useState(checkPrivateRouter.checkPrivate)
    const [profile, setProfile] = useState(checkPrivateRouter.profile)
    return (
        <AppContext.Provider
            value={{
                checkPrivate,
                setCheckPrivate,
                profile,
                setProfile,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}