import './OnlineUsers.css';
import { useCollection } from '../hooks/useCollection';
import React from 'react'
import Avatar from './Avatar';

export default function OnlineUsers() {

    const {document, error} = useCollection('users');

  return (
    <div className='user-list'>
        <h2>All users</h2>
        {error && <div className='error'>{error}</div>}
        {document && document.map((user) => (
            <div key={user.id} className='user-list-item'>
                {user.online && <span className='online-users'></span>}
                <span>{user.displayName}</span>
                <Avatar src={user.photoURL} className='avatar'/>
            </div>
        ))}
    </div>
  )
}
