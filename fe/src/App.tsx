import React, { useEffect } from 'react';
import './App.css';
import { PDF } from './components/PDF';
import { CustomizedInputBase } from './components/Search';
import { PdfUploader } from './components/PdfUploader';
// import PdfViewerComponent from './components/PdfViewerComponent';
import PdfPreview from '../archiveddd/PdfPreview';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from './Auth/Login';
import { Signup } from './Auth/Signup';

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/home",
      element:<PDF/>
    },
    {
      path: "/*",
      element:<Signup/>
    }
  ]);

  useEffect(()=>{
  //  console.log("App is rendered"); 
  })

  return (
    <RouterProvider router={router} />
  );
}

export default App;
