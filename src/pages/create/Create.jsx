import React, { useEffect, useState } from 'react'
import './Create.css'
import Select from 'react-select'
import {useCollection} from '../../hooks/useCollection'
import  {timestamp} from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFireStore'
import { useNavigate } from 'react-router-dom'


export default function Create() {
  const {addDocument, response } = useFirestore('projects')
  const navigate = useNavigate()
  const { document } = useCollection('users')
  const [users, setUsers] = useState([])


  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  const categories =[
    {value: 'development', label: 'Development'},
    {value: 'design', label: 'Design'},
    {value: 'marketing', label: 'Marketing'},
    {value: 'sales', label: 'Sales'},
  ]

  useEffect(() => {
    if(document){
      console.log("Users document:", document);  // Debugging the fetched users
      const options = document.map((user) => {
        return { value: user , label : user.displayName}
      })

      setUsers(options)
    }
  }, [document])

  const {user } = useAuthContext()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    
    //validate form
    if(!category)
      return setFormError('Please select a category')
    if(assignedUsers && assignedUsers.length === 0){
      return setFormError('Please assign the project to at least one user')
    }

    const createdBy = {
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })

    const project ={
      name,
      details,
      category: category ? category.value : '',
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    }

    console.log('Submitting project:', project);  // Debugging
    try {
      await addDocument(project)
      if(!response.error){
        navigate('/')
      }else {
        setFormError('Failed to add project. Please try again.');
      }
    } catch (error) {
      setFormError('Failed to add project. Please try again.')
    }
    

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
            min={new Date().toISOString().split('T')[0]}
            required 
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select 
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select 
            options={users}
            onChange={(option) => setAssignedUsers(option || [])}
            isMulti
          />
        </label>
        {formError && <div className='error'>{formError}</div>}
        <button className='btn'>Add Project</button>
      </form>
    </div>
  )
}
