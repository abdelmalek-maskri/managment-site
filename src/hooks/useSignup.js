import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
import { firebaseStorage } from '../firebase/config';
import { db } from '../firebase/config';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null);
        setIsPending(true);
        
        try{
        //signup user
        const res = await projectAuth.createUserWithEmailAndPassword(email, password);
        

        if(!res){
            throw new Error('Could not complete signup');
        }

        //upload thumbnail
        const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
        const img = await firebaseStorage.ref(uploadPath).put(thumbnail);
        const imgUrl = await  img.ref.getDownloadURL();

        //add display name to user
        await res.user.updateProfile({ displayName, photoURL: imgUrl });

        //create a user document
        await db.collection('users').doc(res.user.uid).set({
            online: true,
            displayName,
            photoURL: imgUrl
        })

        //dispatch login action
        dispatch({type: 'LOGIN', payload: res.user});

        
        setIsPending(false);
        setError(null);

        

        }catch(err){
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
        }
    }


    return { error, isPending, signup };
}