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
            <Route index element={<Dashboard />} />
            <Route path="create" element={<Create />} />
            <Route path="projects/:id" element={<Project />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
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
