import React , {useState} from 'react'
import { useSignup } from '../../hooks/useSignup'
import './Signup.css'


export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)

  const {signup, error, isPending} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email,password,displayName,thumbnail)
  }
  
  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected)
    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if(!selected.type.includes('image')){
      setThumbnailError('Please select an image file')
      return
    }
    if(selected.size > 1000000){
      setThumbnailError('Image file should be less than 100kb')
      return
    }

    setThumbnailError(null)

    setThumbnail(selected)
    console.log('thumbnail updated')
  }


  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email</span>
        <input 
          type='email' 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          placeholder='Email'
        />
      </label>
      <label>
        <span>Password</span>
        <input 
          type='password' 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          placeholder='Password'
        />
      </label>
      <label>
        <span>User Name</span>
        <input 
          type='displayName' 
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
          placeholder='User Name'
        />
      </label>
      <label>
        <span>Profile thumbnail</span>
        <input 
          type='file' 
          required
          onChange={handleFileChange}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>

      {!isPending && <button className='btn'>Sign up</button>}
      {isPending && <button disabled className='btn'>Signing up...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
