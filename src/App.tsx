import { Routes, Route } from "react-router-dom";
import AuthRoute from "./components/routes/AuthRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import TodoDetail from "./pages/TodoDetail";

// admin
import LoginAdmin from "./pages/admin/Login";
import RegisterAdmin from "./pages/admin/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import UserDetail from "./pages/admin/UserDetail";
import ExplorePartner from "./pages/user/ExplorePartner";
import SearchPage from "./pages/user/SearchPage";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/todo/:id" element={<TodoDetail />} />
          <Route path="/partnerships/explore" element={<ExplorePartner />} />
          <Route path="/partnerships/explore/search" element={<SearchPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/register" element={<RegisterAdmin />} />
        </Route>
        <Route element={<AdminRoute/>}>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/user/:id" element={<UserDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
