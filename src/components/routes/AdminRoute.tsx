import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    let user = JSON.parse(window.localStorage.getItem('Authorization') || "")

    if(user?.user.role === "admin")
        return <Outlet/>

        return <Navigate to="/admin/login" />
    
}
 
export default AdminRoute;