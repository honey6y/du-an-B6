import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { getTokenFromLS } from "../actionLocal/ActionLocal";
import { userApi } from "../component/Others/QueryApi";

const checkPrivateRouter = {
    checkPrivate: Boolean(getTokenFromLS()),
    setCheckPrivate: () => null,
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