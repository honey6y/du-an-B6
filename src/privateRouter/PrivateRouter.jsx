import { createContext, useState } from "react";
import { getTokenFromLS } from "../component/actionLocal/ActionLocal";

const checkPrivateRouter = {
    checkPrivate: Boolean(getTokenFromLS()),
    setCheckPrivate: () => null
}

export const AppContext = createContext(checkPrivateRouter)

export const PrivateRoute = ({children}) => {
    const [checkPrivate, setCheckPrivate] = useState(checkPrivateRouter.checkPrivate)
    return (
        <AppContext.Provider
            value={{
                checkPrivate,
                setCheckPrivate
            }}
        >
            {children}
        </AppContext.Provider>
    )
}