import axios from "axios";
import { Button } from "react-daisyui";
import Input from "../../../components/Input/Input";
import Typography from "../../../components/Typography/Typography";
import React from "react";
import { formatDate } from "../../../utils/dateFormatter";
import Swal from "sweetalert2";

interface User {
    nama_depan?: string,
    nama_belakang?: string,
    tanggal_lahir?: any,
    address?: string
    no_telp?: string
    username_ig?: string
}

const PartnershipProcess = ({ userData }: { userData: User }) => {
    const [userProps, setUserProps] = React.useState<User>({})

    let Storage = window.localStorage.getItem('Authorization')

    let user = Storage !== null ? JSON.parse(Storage || "") : '';

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        
        axios.put('http://localhost:3333/api/auth/update', {
            nama_depan: userProps.nama_depan,
            nama_belakang: userProps.nama_belakang,
            tanggal_lahir: userProps.tanggal_lahir,
            address: userProps.address,
            no_telp: userProps.no_telp,
            username_ig: userProps.username_ig
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                console.log(res);

                Swal.fire('Success', 'Success update Profile', 'success')

                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            })
            .catch(err => {
                console.log(err);

                Swal.fire('Error', 'error update Profile', 'error')
            })

    }

    return (
        <div>
            <Typography variant="subtitle2" className="mt-10 mb-3">Lengkapi data pribadimu dulu ya</Typography>
            <Typography variant="paragraph">Data ini diperlukan oleh perusahaan yang hendak kamu ajukan sponsorship</Typography>
            <div className="mx-auto mt-10">
                <div className="flex items-center justify-between mb-3">
                    <div className="md:w-[45%]">
                        <Input onChange={e => setUserProps(prev => {
                            return {...prev, nama_depan: e.target.value}
                        })} defaultValue={userData.nama_depan} label="Nama depan*" />
                    </div>
                    <div className="md:w-[45%]">
                        <Input
                        onChange={e => setUserProps(prev => {
                            return {...prev, nama_belakang: e.target.value}
                        })}
                        defaultValue={userData.nama_belakang} label="Nama depan*" />
                    </div>
                </div>
                <Input
                onChange={e => setUserProps(prev => {
                    return {...prev, tanggal_lahir: e.target.value}
                })}
                className="mb-3" type="date" defaultValue={userData.tanggal_lahir !== null ? formatDate(userData?.tanggal_lahir) : userData.tanggal_lahir} label="tanggal lahir*" placeholder="Mei 2002" />
                <Input
                onChange={e => setUserProps(prev => {
                    return {...prev, no_telp: e.target.value}
                })}
                className="mb-3" defaultValue={userData?.no_telp} label="Nomor telepon*" placeholder="081..." />
                <Input 
                onChange={e => setUserProps(prev => {
                    return {...prev, address: e.target.value}
                })}
                defaultValue={userData?.address} label="Alamat*" placeholder="Jalan blablabla" className="mb-3" />
                <Input 
                onChange={e => setUserProps(prev => {
                    return {...prev, username_ig: e.target.value}
                })}
                defaultValue={userData?.username_ig} label="Username Instagram*" placeholder="@user" />
                <div className="flex justify-end">
                    <Button type="button" className="mt-5 w-fit" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    );
}

export default PartnershipProcess;