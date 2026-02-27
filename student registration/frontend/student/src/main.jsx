import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Data from './student.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
const router=createBrowserRouter([
  {
    path:"/student",
    element:<Data/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
