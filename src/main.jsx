import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { StrictMode, useEffect } from 'react'

import App from './App.jsx'
import Home from './Home.jsx'
import Leaderboard from './Leaderboard/Leaderboard.jsx'
import Multiplayer from './Multiplayer.jsx'
import Theme from './Theme.jsx'
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
    <Theme>
      <RouterProvider router={router} />
    </Theme>

  </StrictMode>,
)
