import { Badge, Button, Table } from "react-daisyui";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";

import React from "react";
import axios from "axios";
import Typography from "../../components/Typography/Typography";

const Users = () => {
    const [pengajuans, setPengajuans] = React.useState<Array<{
        id_pengajuan: number,
        username: string
        email: string,
        role: string,
        nama_acara: string,
        status: 'berlangsung' | 'berhasil' | 'gagal' | 'selesai',
        nama_depan: string,
        nama_belakang: string
    }>>([]);
    const navigate = useNavigate()

    let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

    React.useEffect(() => {
        axios.get('http://localhost:3333/api/pengajuan/user/get/all?role=partner', {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(res => {
                console.log(res)
                setPengajuans(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [userData.token])

    return (
        <AdminLayout>
            <div className="overflow-x-auto bg-white p-5 mt-10 rounded-xl shadow">
                <Typography variant="subtitle2" className="mb-10">Pengajuan anda</Typography>
                <Table className="w-full" >
                    <Table.Head>
                        <span />
                        <span>Nama acara</span>
                        <span>Status</span>
                        <span>Nama Pengaju</span>
                        <div className="w-full text-right">
                            <span>Action</span>
                        </div>
                    </Table.Head>

                    <Table.Body>
                        {
                            pengajuans.length > 0 &&
                            pengajuans.map((user, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <span>{index + 1}</span>
                                        <span>{user.nama_acara}</span>
                                        <Badge variant="outline" color={
                                            user.status === "berhasil" ? 'info'
                                                : user.status === "berlangsung" ? 'primary'
                                                    : user.status === "selesai" ? 'success'
                                                        : user.status === "gagal" ? 'error'
                                                            : 'primary'
                                        }>{user.status}</Badge>
                                        <span>{user.nama_depan + " " + user.nama_belakang}</span>
                                        <div className="flex items-center justify-end">
                                            <Button onClick={() => navigate(`/partner/partnership/${user.id_pengajuan}`)} endIcon={<AiFillEdit />}>Detail</Button>
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

export default Users;