import { Routes, Route } from "react-router-dom";
import AuthRoute from "./components/routes/AuthRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import TodoDetail from "./pages/TodoDetail";

// partner
import LoginPartner from "./pages/partner/Login";
import RegisterPartner from "./pages/partner/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import UserDetail from "./pages/admin/UserDetail";
import ExplorePartner from "./pages/user/ExplorePartner";
import SearchPage from "./pages/user/SearchPage";
import PartnerDetail from "./pages/user/PartnerDetail";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";
import ProgressStep from "./pages/user/PartnershipProcess/ProgressStep";
import Riwayat from "./pages/user/Riwayat";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/todo/:id" element={<TodoDetail />} />
          <Route path="/partnerships/explore" element={<ExplorePartner />} />
          <Route path="/partnerships/explore/search" element={<SearchPage />} />
          <Route path="/partnerships/partner/:id" element={<PartnerDetail />} />
          <Route path="/partnerships/progress/:id_partner" element={<ProgressStep />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/profile/edit" element={<EditProfile />} />
          <Route path="/user/history" element={<Riwayat />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/partner/login" element={<LoginPartner />} />
          <Route path="/partner/register" element={<RegisterPartner />} />
        </Route>
        <Route element={<AdminRoute/>}>
          <Route path="/partner/dashboard" element={<Dashboard/>}/>
          <Route path="/partner/user/:id" element={<UserDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
