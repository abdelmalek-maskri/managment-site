import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className='App'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
