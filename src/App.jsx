import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
