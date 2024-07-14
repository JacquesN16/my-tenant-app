import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import CreateProfile from "./app/02_CreateProfile.tsx";
import ProfileDetail from "./app/03_ProfileDetail.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/new",
        element: <CreateProfile />,
    },
    {
        path: "/profile/:id",
        element: <ProfileDetail />,
    }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
