import { Routes, Route, Navigate } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./authSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
