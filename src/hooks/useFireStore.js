import {db, timestamp} from '../firebase/config';
import { useReducer } from 'react';

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch(action.type){
        case 'IS_PENDING':
            return {document: null, isPending: true, error: null, success: false}
        case 'ADDED_DOCUMENT':
            return {document: action.payload, isPending: false, error: null, success: true}
        case 'DELETED DOCUMENT':
            return {document: null, isPending: false, errror: null, success: true}
        case 'UPDATED_DOCUMENT':
            return {document: action.payload, isPending: false, error: null, success: true}
        case 'ERROR':
            return {document: null, isPending: false, error:  action.payload, success: false}
        default:
            return state
    }
}


export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);

    //collection res
    const ref = db.collection(collection);

    //only dispatch if the comonent didn't mount or cancelled

    //add document
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})
        try{
            const createdAt = timestamp.fromDate(new Date())
            console.log('Adding document:', { ...doc, createdAt });  // Debugging
            const addedDocument = await ref.add({...doc, createdAt});

            dispatch({type: 'ADDED_DOCUMENT', payload: addedDocument});
            console.log('Document added successfully:', addedDocument);  // Debugging
        }catch(err){
            console.error('Error adding document:', err.message);  // Debugging
            dispatch({type: 'ERROR', payload: err.message})
        }
        
    }

    //update a document
    const updateDocument = async(id, update) => {
        dispatch({type: 'IS_PENDING'})

        try{
            const updatedDocument = await ref.doc(id).update(update)
            dispatch({action: 'UPDATED_DOCUMENT', payload: updatedDocument})
            return updatedDocument
            
        }catch(error){
            dispatch({type: 'ERROR', payload: 'Could not update'})
            return null
        }
    }

    //delete a document
    const deleteDocument = async (id) =>{
        dispatch({type: 'IS_PENDING'})

        try{
            await ref.doc(id).delete()
            dispatch({type: 'DELETED DOCUMENT'})

        }catch(error){
            dispatch({type: 'ERROR', payload: 'Could not delete'})
        }
    }
    

    return {response, addDocument, deleteDocument, updateDocument}
}