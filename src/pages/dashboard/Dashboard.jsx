import React from 'react'
import { useCollection } from '../../hooks/useCollection'
import './Dashboard.css'
import ProjectList from '../../components/ProjectList'
import 'ldrs/ring'


export default function Dashboard() {

  const {document, error, loading} = useCollection('projects')

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <div className='error'>{error}</div>}
      {loading && <div className='loading-container'>
        <l-ring className='loading' size="80" stroke="7" bg-opacity="0" speed="2" color="black"></l-ring>
      </div>}
      {document && <ProjectList projects ={document}/>}
    </div>
  )
}
