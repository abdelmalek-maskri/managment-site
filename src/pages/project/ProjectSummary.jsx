import React from 'react'
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFireStore'
import { useNavigate } from 'react-router-dom'

export default function ProjectSummary({project}) {
    const {user} = useAuthContext()
    const {deleteDocument} = useFirestore('projects')
    const navigate = useNavigate()
    const handleDelete = () => {
        deleteDocument(project.id)
        navigate('/')
    }

  return (
    <div>
      <div className="project-summary">
        <h2 className='project-title'>{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>

        <p className='due-date'>
            project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className='details'>
            {project.details}
        </p>
        <h4>Project Assigned to:</h4>
        <div className='assigned-users'>
        {project.assignedUsersList.map(user => (
            <div key={user.id}>
                <Avatar src={user.photoURL} alt={user.displayName} className='avatar'/>
            </div>
        )
        )}        
        </div>
      </div>
      {user.uid === project.createdBy.id && 
        <button className='btn' onClick={handleDelete}>Mark as delete</button>
    }
    </div>
  )
}
