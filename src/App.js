//router
import { Routes, Route, BrowserRouter } from "react-router-dom";
//styles
import "./styles/App.css";
import "./styles/navbars.css";
import "./styles/dropdown.css";
import "./styles/card.css";
import "./styles/modal.css";
import "./styles/login.css";
//pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Statistics from "./pages/Statistics";
//route guards
import { AuthRoute, RequireAuthRoute } from "./components/routeguards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          exact
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />
        <Route
          path="/home"
          exact
          element={
            <RequireAuthRoute>
              <Home />
            </RequireAuthRoute>
          }
        />
        <Route
          path="/dashboard"
          exact
          element={
            <RequireAuthRoute>
              <Dashboard />
            </RequireAuthRoute>
          }
        />
        <Route
          path="/users"
          exact
          element={
            <RequireAuthRoute>
              <Users />
            </RequireAuthRoute>
          }
        />
        <Route
          path="/statistics"
          exact
          element={
            <RequireAuthRoute>
              <Statistics />
            </RequireAuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
