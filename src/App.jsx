import './App.css'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import route from './routes/routes';
import { Toaster, toast } from 'sonner'



const App = () => {
  <Toaster/>
  return <RouterProvider router={route}/>
}


export default App;