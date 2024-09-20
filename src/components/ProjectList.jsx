import React from 'react'
import './ProjectList.css'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'


export default function ProjectList({ projects }) {
    console.log(projects)
  return (
    <div className='project-list'>
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className='assigned-to'>
                <ul>
                    {project.assignedUsersList.map(user => (
                        <li key={user.photoURL}> 
                            <Avatar src={user.photoURL} alt={user.displayName} className='avatar'/>
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
      ))}
    </div>
  )
}
