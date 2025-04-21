import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home/>}/>
      <Route path='/Login' exact element={<Login/>}/>
      <Route path='/SignUp' exact element={<SignUp/>}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {routes}
      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  )
}

export default App
