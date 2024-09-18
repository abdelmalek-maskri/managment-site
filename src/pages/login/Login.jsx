import React from 'react'
import './Login.css'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isPending} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
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
      {!isPending && <button className='btn'>Login</button>}
      {isPending && <button disabled className='btn'>Logging...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
