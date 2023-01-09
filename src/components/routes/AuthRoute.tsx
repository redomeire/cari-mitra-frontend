import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
    let Storage = window.localStorage.getItem('Authorization')

    let user = Storage !== null ? JSON.parse(Storage || "") : ''

    if(user?.role === "user")
        return <Navigate to='/' />

        if(user?.role === "partner")
        return <Navigate to='/partner/dashboard'/>

        return <Outlet/>
}

export default AuthRoute;