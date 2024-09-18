import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useAuthContext } from './hooks/useAuthContext'
function App() {
  const { user } = useAuthContext()
  return (
    <div className='App'>
      {user && <Sidebar />}
      <div className='container'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
