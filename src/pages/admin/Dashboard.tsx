import { Button, Table } from "react-daisyui";
import AdminLayout from "../../components/layout/AdminLayout";
import Typography from "../../components/Typography/Typography";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [users, setUsers] = React.useState<Array<{
        id: number,
        username: string
        email: string,
        role: string
    }>>([]);
    const navigate = useNavigate()

    const getUsers = () => {
        let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

        axios.get('http://127.0.0.1:3333/users', {
            headers: {
                Authorization: `Bearer ${userData.token.token}`
            }
        })
            .then(res => {
                console.log(res)
                setUsers(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        getUsers()
    }, [])

    const deleteUser = (id: number) => {
        let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

        axios.delete('http://127.0.0.1:3333/delete', {
            headers: {
                Authorization: `Bearer ${userData.token.token}`
            },
            data: {
                id: id
            }
        }
        )
            .then(res => {
                console.log(res)
                Swal.fire(
                    'Success',
                    'Success delete user',
                    'success'
                )

                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            })
            .catch(err => {
                console.log(err);

                Swal.fire(
                    'Failed',
                    err.message,
                    'error'
                )
            })
    }

    return (
        <AdminLayout pageName="Dashboard">
            <div className="flex md:items-center justify-between md:flex-row flex-col w-full">
                <div className="md:w-[48%] min-h-[200px] bg-white p-4 rounded-2xl transition duration border-b-8 border-b-red-500">
                    <div className="bg-red-200 w-fit mx-auto p-2 text-red-600 rounded-lg">
                        <Typography variant="body1" className="text-center">Total User</Typography>
                    </div>
                    <div className="flex items-center justify-center mt-10 flex-col">
                        <Typography variant="subtitle1">50+</Typography>
                        <Button className="mt-5">Visit</Button>
                    </div>
                </div>
                <div className="md:w-[48%] min-h-[200px] bg-white p-4 rounded-2xl transition duration border-b-8 border-b-green-500 md:mt-0 mt-5">
                    <div className="bg-green-200 w-fit mx-auto p-2 text-green-600 rounded-lg">
                        <Typography variant="body1" className="text-center">Total Todos</Typography>
                    </div>
                    <div className="flex items-center justify-center mt-10 flex-col">
                        <Typography variant="subtitle1">500+</Typography>
                        <Button className="mt-5">Visit</Button>
                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <Typography variant="title" className="mb-5 mt-20">Users</Typography>
                <Table className="w-full" >
                    <Table.Head>
                        <span />
                        <span>Name</span>
                        <span>Email</span>
                        <span>Role</span>
                        <div className="w-full text-right">
                            <span>Action</span>
                        </div>
                    </Table.Head>

                    <Table.Body>
                        {
                            users.map((user, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <span>{index + 1}</span>
                                        <span>{user.username}</span>
                                        <span>{user.email}</span>
                                        <span>{user.role}</span>
                                        <div className="flex items-center justify-end">
                                            <Button onClick={() => navigate(`/admin/user/${user.id}`)} endIcon={<AiFillEdit />}>Edit</Button>
                                            <Button onClick={() => deleteUser(user.id)} endIcon={<AiFillDelete />} className="ml-3">Delete</Button>
                                        </div>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;