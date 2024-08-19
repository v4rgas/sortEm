import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import Home from './Home.jsx'
import Leaderboard from './Leaderboard/Leaderboard.jsx'
import Multiplayer from './Multiplayer.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/m/:id',
      element: <Multiplayer />
    },
    {
      path: '/m',
      element: <Multiplayer />
    },
    {
      path: '/l',
      element: <Leaderboard />
    }
  ], { basename: '/sortEm' }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
