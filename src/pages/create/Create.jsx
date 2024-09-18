import React, { useState } from 'react'
import './Create.css'
export default function Create() {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('name:', name, 'details:', details, 'dueDate:', dueDate)

  }
  
  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new Project</h2>   
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input 
            type='text' 
            placeholder='Project Name' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required/>
        </label>
        <label>
          <span>Project Details:</span>
          <textarea 
            required 
            type='text' 
            onChange={(e) => setDetails(e.target.value)} 
            value={details}
          >

          </textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input 
            type='date'  
            placeholder='Due Date' 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            required 
          />
        </label>
        <label>
          <span>Project category:</span>
          {/* {category select here} */}
        </label>
        <label>
          <span>Assign to:</span>
          {/* {users select here} */}
        </label>

        <button className='btn'>Add Project</button>
      </form>
    </div>
  )
}
