// router.js
import React from 'react';
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider , Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import App from './App';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

const RouterComponent = () => {
  const { isAuthReady, user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
            <Route index element={user ? <Dashboard /> : <Navigate to='/login'/>} />
            <Route path="create" element={user ? <Create />: <Navigate  to='/login'/>} />
            <Route path="projects/:id" element={user ? <Project  /> : <Navigate  to='/login'/>} />
            <Route path="login" element={user ? <Navigate to='/' /> : <Login />} />
            <Route path="signup" element={user ? <Navigate to='/' /> : <Signup />} />
      </Route>
    )
  );

  return (
    <>
      {isAuthReady ? (
        <RouterProvider router={router} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default RouterComponent;
