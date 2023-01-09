import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    let Storage = window.localStorage.getItem('Authorization')

    let user = Storage !== null ? JSON.parse(Storage || "") : ''

    if (user !== '') {
        if (user?.role === "partner")
            return <Outlet />
    }

    return <Navigate to='/partner/login' />
    
}
 
export default AdminRoute;