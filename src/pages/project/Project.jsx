import React from 'react'
import './Project.css'
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import 'ldrs/ring'
import ProjectSummary from './ProjectSummary'
import ProjecrComment from './ProjectComment'

export default function Project() {
  const { id } = useParams()
  const {document, error} = useDocument('projects', id)
  if(error) 
    return <div className='error'>{error}</div>
  if(!document){
    return (
    <div className='loading-container'>
      <l-ring className='loading' size="80" stroke="7" bg-opacity="0" speed="2" color="black"></l-ring>
    </div>
    )
  }

  return (
    <div className='project-details'>
      <ProjectSummary project ={document}/>
      <ProjecrComment project={document}/>
    </div>
  )
}
