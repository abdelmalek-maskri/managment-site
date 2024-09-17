import { createContext , useReducer, useEffect} from "react";
import { projectAuth } from "../firebase/config";
export const AuthContext = createContext();

export const authReducer = (state, action) => {

    switch(action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, isAuthReady: true}
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, {
        user: null,
        isAuthReady: false
    })
    console.log('AuthContext state:', state, "isAuthReady:", state.isAuthReady);

    useEffect(() => {
        const unsubscribe = projectAuth.onAuthStateChanged((user) => {
            dispatch({type: 'AUTH_IS_READY', payload: user})
            unsubscribe();
        })
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}