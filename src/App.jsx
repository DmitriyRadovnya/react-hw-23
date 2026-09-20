import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router";
import { RegisterPage } from "./components/RegisterPage";
import { LoginPage } from "./components/LoginPage";
import { Layout } from "./components/Layout";
import { Todo } from "./components/Todo";
import "./App.css";
import { useSelector } from "react-redux";

const Protected = () => {
  const isAuth = useSelector((store) => store.auth.isAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to="/register" replace />;
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<Protected />}>
          <Route index element={<Todo />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
