import logo from './logo.svg';
import './App.css';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Notfound from './components/Notfound/Notfound';
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/tokenContext';
import SendMessages from './components/sendMessages/sendMessages';
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes';

function App() {
  let {setToken}=useContext(tokenContext)
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))
    }
  },[])
  const rotes = createBrowserRouter([{path:"",element:<Layout/>,children:[
    {path:"register",element:<Register/>},
    {path:"login",element:<Login/>},
    {path:"login",element:<Login/>},

    {path:"profile",element:<ProtectedRoutes><Profile/></ProtectedRoutes> },
    {path:"messages/:id",element:<SendMessages/>},


    {path:"*",element:<Notfound/>}
  ]}])
  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={rotes}>
      </RouterProvider>

    </QueryClientProvider>
   
  );
}

export default App;
