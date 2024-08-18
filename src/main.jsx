import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import Multiplayer from './Multiplayer.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/m/:id',
      element: <Multiplayer />
    },
    {
      path: '/m',
      element: <Multiplayer />
    }
  ], { basename: '/sortEm' }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
