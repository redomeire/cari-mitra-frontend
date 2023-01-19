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
import ProgressStep from "./pages/user/PartnershipProcess/ProgressStep";
import Riwayat from "./pages/user/Riwayat";
import PengajuanDetail from "./pages/user/Pengajuan/PengajuanDetail";
import Pengajuans from "./pages/partner/Pengajuans";

// socket
import io from "socket.io-client";
import Partnership from "./pages/partner/PengajuanDetail";

// change host when deploying to production
const host = 'http://localhost:3333';
const socket = io(host)

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

          <Route path="/user/history" element={<Riwayat />} />
          <Route path="/user/pengajuan/:id/details" element={<PengajuanDetail socket={socket} />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/partner/login" element={<LoginPartner />} />
          <Route path="/partner/register" element={<RegisterPartner />} />
        </Route>
        <Route element={<AdminRoute/>}>
          <Route path="/partner/dashboard" element={<Dashboard/>}/>
          <Route path="/partner/partnership/:id" element={<Partnership socket={socket}/>}/>
          <Route path="/partner/pengajuans" element={<Pengajuans/>}/>
          <Route path="/partner/user/:id" element={<UserDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
