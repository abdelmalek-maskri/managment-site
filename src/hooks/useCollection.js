import { useEffect, useRef, useState } from "react"
import { db } from "../firebase/config"



export const useCollection = (collection, _query, _orderBy) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        setLoading(true);
        let ref = db.collection(collection);

        if(query){
            ref = ref.where(...query)
        }

        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let result = [];
            snapshot.docs.forEach((doc) => {
                result.push({...doc.data(), id: doc.id})
            })

            //update state
            setLoading(false);
            setDocument(result);
            setError(null);
        },(error) => {
            setLoading(false);
            console.log(error);
            setError("Could not fetch data :(")
        })

        //unsubscribe on unmount
        return () => unsubscribe()
    
    }, [collection, orderBy])

    return {document, error, loading}
}