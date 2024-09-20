import React, {useState} from 'react'
import { useCollection } from '../../hooks/useCollection'
import './Dashboard.css'
import ProjectList from '../../components/ProjectList'
import 'ldrs/ring'
import ProjectFilter from './ProjectFilter'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Dashboard() {
  const {user} = useAuthContext()
  const {document, error, loading} = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const filteredProjects = document ? document.filter(project => {
    switch(currentFilter){
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        project.assignedUsersList.forEach((u) => {
          if(user.uid === u.id){
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'marketing':
      case 'sales':
        console.log(project.category, currentFilter)
        return project.category === currentFilter
      default:
        return true
    }
  }): null

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <div className='error'>{error}</div>}
      {loading && <div className='loading-container'>
        <l-ring className='loading' size="80" stroke="7" bg-opacity="0" speed="2" color="black"></l-ring>
      </div>}
      {document && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
      {document && <ProjectList projects ={filteredProjects}/>}
    </div>
  )
}
