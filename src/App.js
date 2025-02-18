import React, { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import View from "./pages/View";
import { AuthContext } from "./authContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
function App() {
  const url = "https://travel-journal-log-be.onrender.com";
  const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Login />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home url={url} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login url={url} />} />
        <Route path="/register" element={<Register url={url} />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Create url={url} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <View url={url} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
