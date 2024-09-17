import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogout = () => {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try{    
            //sign user out
            await projectAuth.signOut();

            //dispatch logout action
            dispatch({type: 'LOGOUT'});

            //update state  if we unmount before the async function completes
            //we only update state if we are not cancelled
            //if we are cancelled, we don't want to update state because it will cause an error

            setIsPending(false);
            setError(null);
            

        }catch(err){

            setError(err.message);
            setIsPending(false);

        }
    }



    return { error, isPending, logout };
}
