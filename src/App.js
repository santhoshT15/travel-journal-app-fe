import React, { useContext } from "react";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import Create from './pages/Create';
import View from './pages/View';
import { AuthContext } from './authContext'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
function App() {
  const {user} = useContext(AuthContext);
  const ProtectedRoute = ({children}) => {
    if(!user){
      return <Login/>;
    }else{
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path="/view/:id" element={<ProtectedRoute><View /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
