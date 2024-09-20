import React from 'react'
import { useState } from 'react'
import {useAuthContext} from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFireStore'
import Avatar from '../../components/Avatar'
import { formatDistanceToNow } from 'date-fns'

export default function ProjectComment({project}) {
    const {updateDocument, response} = useFirestore('projects')
    const [newComment, setNewComment] = useState('')
    const {user } = useAuthContext()

    const handleSubmit = async (e) => {   
        e.preventDefault()
        const commentToAdd ={
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocument(project.id, {comments: [...project.comments, commentToAdd]})
        if(!response.error){
            setNewComment('')

        }
    }


  return (
    <div className='project-comments'>
        <h4>Project Comments</h4>
        <ul>
            {project.comments.length > 0 && project.comments.map(comment => (
                <li key={comment.id}>
                    <div className='comment-author'>
                        <Avatar src={comment.photoURL} alt={comment.displayName} className='avatar'/>
                        <p>{comment.displayName}</p>
                    </div>
                    <div className='comment-date'>
                        <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true})}</p>
                    </div>
                    <div className='comment-content'>
                        <p>{comment.content}</p>
                    </div>
                </li>
            ))}
        </ul>
        <form className='add-comment' onSubmit={handleSubmit}>
            <label>
                <span>Add Comment:</span>
                <textarea
                    placeholder='Add your comment here...'
                    required
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                ></textarea>
            </label>
            <button className='btn'>Add Comment</button>
        </form>
    </div>
  )
}
