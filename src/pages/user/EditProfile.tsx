import { Button, Modal } from "react-daisyui";
import Input from "../../components/Input/Input";
import Typography from "../../components/Typography/Typography";

import React from "react"
import axios from "axios";
import Swal from "sweetalert2";

interface User {
    email?: string,
    id?: number,
    nama_belakang?: string,
    nama_depan?: string,
    role?: "user" | "admin" | "partner",
    no_telp?: string,
    tanggal_lahir?: string,
    username_ig?: string,
    address?: string
}

const EditProfile = ({ visible, setVisible, user }: { visible: boolean, setVisible: Function, user: User }) => {
    const [userData, setUserData] = React.useState(user)

    const handleSubmit = (e: { preventDefault: () => void }) => {
        let Storage = window.localStorage.getItem('Authorization')

        let userStorage = Storage !== null ? JSON.parse(Storage || "") : ''

        e.preventDefault()

        axios.put('http://localhost:3333/api/auth/update', {
            nama_depan: userData.nama_depan,
            nama_belakang: userData.nama_belakang,
            tanggal_lahir: userData.tanggal_lahir,
            address: userData.address,
            no_telp: userData.no_telp,
            username_ig: userData.username_ig
        }, {
            headers: {
                Authorization: `Bearer ${userStorage.token}`
            }
        })
            .then(res => {
                console.log(res);

                Swal.fire('Success', 'Success update Profile', 'success')
                setVisible(false)

                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            })
            .catch(err => {
                console.log(err);

                Swal.fire('Error', 'error update Profile', 'error')
            })

    }

    return (
        <div className="w-full">
        <Modal open={visible} className="w-[100%]" onClickBackdrop={() => setVisible(!visible)}>
            <div className="mx-10">
                <form className="mx-auto mt-10" onSubmit={handleSubmit}>
                    <Typography variant="subtitle1">Edit Profile</Typography>
                    <Typography variant="paragraph" className="my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum quaerat nulla deleniti fugit quod ab ullam unde sapiente dolores! Vel itaque ducimus animi quaerat quasi, obcaecati quos tenetur dolorem cupiditate!</Typography>
                    <div className="flex items-center justify-between mt-10 mb-3">
                        <div className="md:w-[45%]">
                            <Input onChange={e => setUserData(prev => {
                                return { ...prev, nama_depan: e.target.value }
                            })} required type="text" label="Nama depan*" defaultValue={user.nama_depan} />
                        </div>
                        <div className="md:w-[45%]">
                            <Input onChange={e => setUserData(prev => {
                                return { ...prev, nama_belakang: e.target.value }
                            })} required type="text" label="Nama belakang*" defaultValue={user.nama_belakang} />
                        </div>
                    </div>
                    <Input onChange={e => setUserData(prev => {
                        return { ...prev, tanggal_lahir: e.target.value }
                    })} required type="date" label="Tanggal lahir*" className="mb-3" defaultValue={user.tanggal_lahir} />
                    <Input onChange={e => setUserData(prev => {
                        return { ...prev, address: e.target.value }
                    })} required type="text" label="Alamat*" className="mb-3" defaultValue={user.address} />
                    <Input onChange={e => setUserData(prev => {
                        return { ...prev, no_telp: e.target.value }
                    })} required type="text" label="Nomor telepon*" className="mb-3" defaultValue={user.no_telp} />
                    <Input onChange={e => setUserData(prev => {
                        return { ...prev, username_ig: e.target.value }
                    })} required type="text" label="Username instagram*" className="mb-3" defaultValue={user.username_ig} />
                    <div>
                        <Button>Submit</Button>
                    </div>
                </form>
            </div>
        </Modal>
        </div>
    );
}

export default EditProfile;