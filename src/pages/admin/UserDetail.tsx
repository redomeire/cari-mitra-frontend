import axios from "axios";
import React from "react";
import { Button } from "react-daisyui";
import { useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import AdminLayout from "../../components/layout/AdminLayout";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = React.useState<{ 
        username: string,
        email: string,
        role: "admin" | "user" | ''
     }>({
        username: '',
        email: '',
        role: ''
     });

    const getUser = () => {
        let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

        axios.get(`http://127.0.0.1:3333/users/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${userData.token.token}`
            }
        })
        .then((res) => {
            console.log(res)
            setUser(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    React.useEffect(() => {
        getUser()
    }, [])

    return ( 
        <AdminLayout pageName="User detail">
            <form className="bg-white p-5 rounded-xl">
                <Input defaultValue={user.username} label="name"/>
                <Input defaultValue={user.email} type="email" label="email"/>
                <Input defaultValue={user.role} label="role"/>

                <Button type="submit" className="mt-5">Submit</Button>
            </form>
        </AdminLayout>
     );
}
 
export default UserDetail;