import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);
    
        try{
            //login user
            const res = await projectAuth.signInWithEmailAndPassword(email, password);
            
            //check if user exists
            if(!res){
                throw new Error('Could not complete login');
            }

            //dispatch login action
            dispatch({type: 'LOGIN', payload: res.user});
            

            setIsPending(false);
            setError(null);

        }catch(err){
            console.log(err.message);
            setError('Wrong email or password :(');
            setIsPending(false);
        
        }
    }


    return { error, isPending, login };
}