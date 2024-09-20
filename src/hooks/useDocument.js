import {db} from '../firebase/config';
import { useState, useEffect } from 'react';

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = db.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot((onSnapshot) => {
            if(!onSnapshot.exists){
                setError('Document does not exist')
                return
            }
            setDocument({...onSnapshot.data(), id: onSnapshot.id})
            setError(null)
            
        }, (err) => {
            console.error(err.message)
            setError('Could not fetch the document')
        })

        return () => unsubscribe()
    }, [collection, id])

    return {document, error}
}
