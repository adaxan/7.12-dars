import {React , useEffect} from "react";
import Navbar from "./layout/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import ArticleCard from "./pages/ArticleCard";
import CreateArticle from "./pages/CreateArticle";
import Comment from "./pages/Comment";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  const navigate = useNavigate();

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        navigate("/login", {
          replace: true,
        });
      }
    }, [token, navigate]);

    return children;
  }
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navbar><ArticleCard /></Navbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/createart"
          element={
            <PrivateRoute>
              <Navbar><CreateArticle /></Navbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <PrivateRoute>
              <Navbar><ArticleDetail /></Navbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/comments"
          element={
            <PrivateRoute>
              <Navbar><Comment /></Navbar>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
