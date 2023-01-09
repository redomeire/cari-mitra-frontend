import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    let Storage = window.localStorage.getItem('Authorization')

    let user = Storage !== null ? JSON.parse(Storage || "") : ''

    if (user !== '') {
        if (user?.role === "user")
            return <Outlet />

        else if (user?.role === "partner")
            return <Navigate to='/partner/dashboard' />
    }

    return <Navigate to='/auth/login' />
}

export default PrivateRoute;