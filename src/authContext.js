import { createContext, useEffect, useReducer } from "react";


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};
//console.log(INITIAL_STATE)
const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error:null,
            };
        case "LOGIN_SUCCESS":
            //console.log(action.payload)
            return {
                user: action.payload._id,
                token:action.payload.token,
                loading: false,
                error: null
            };
        case "LOGIN_FAILURE":
             return {
                user: null,
                token: null,
                loading: false,
                error: action.payload
            };
        case "LOGOUT":
             return {
                user: null,
                token: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

const AuthContextProvider = ({ children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        //console.log(state.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token)
    }, [state.user, state.token])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                loading: state.loading,
                error: state.error,
                dispatch
            }}>{children}</AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider, AuthReducer}