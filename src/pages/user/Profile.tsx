import React from "react";
import { Button } from "react-daisyui";
import { FaEdit, FaHandshake, FaHeart } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { BiCalendar, BiLocationPlus, BiMailSend, BiPhoneOutgoing } from "react-icons/bi";
import AppLayout from "../../components/layout/AppLayout";
import Typography from "../../components/Typography/Typography";
import { motion } from "framer-motion";
import axios from "axios";
import { formatDate } from "../../utils/dateFormatter";
import { BsInstagram } from "react-icons/bs";
import EditProfile from "./EditProfile";

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

const Profile = () => {
    const [user, setUser] = React.useState<User>({});
    const [isFavorite, setIsFavorite] = React.useState<boolean>(false);
    const [favorite, setFavorite] = React.useState([]);
    const [visible, setVisible] = React.useState(false);

    let Storage = window.localStorage.getItem('Authorization')

    let userData = Storage !== null ? JSON.parse(Storage || "") : ''

    React.useEffect(() => {
        axios.get('http://localhost:3333/api/auth/user', {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
        .then((res) => {
            console.log(res)

            setUser(res.data.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    const getFavoritePartners = () => {
        axios.get('http://localhost:3333/api/partner/favorite/get/all', {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(res => {
                console.log(res);
                setFavorite(res.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    React.useEffect(() => {
        let Storage = window.localStorage.getItem('Authorization')

        let user = Storage !== null ? JSON.parse(Storage || "") : ''

        setUser(user);
        getFavoritePartners();
    }, [])

    return (
        <AppLayout>
            <EditProfile 
            user={user}
            visible={visible}
            setVisible={setVisible}
            />
            <div className="p-10 min-h-screen flex items-start justify-between">
                <div className="md:w-[65%]">
                    <div className="p-5 border rounded-lg bg-white">
                        <div className=" flex items-center">
                            <div className="rounded-full w-14 h-14 bg-center bg-cover mr-5" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80')` }} />
                            <div>
                                <Typography variant="body1">
                                    {user.nama_depan + " " + user.nama_belakang} <span className="text-[12px]">(24)</span>
                                </Typography>
                                <Typography variant="body2">
                                    {user.email}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex items-center mt-7">
                            <Button onClick={() => setIsFavorite(false)} startIcon={<MdPreview size={20} />} className={`mr-3 rounded-full border-none ${!isFavorite ? 'bg-purple-500 text-white hover:bg-purple-400' : 'bg-transparent hover:bg-transparent text-gray-500'}`} active>
                                <Typography className="text-sm normal-case font-normal">
                                    Overview
                                </Typography>
                            </Button>
                            <Button onClick={() => setIsFavorite(true)} startIcon={<FaHandshake size={20} />} className={`mr-3 bg-transparent hover:bg-transparent text-gray-500 border-none rounded-full ${isFavorite ? 'bg-purple-500 text-white hover:bg-purple-400' : ''}`}>
                                <Typography className="text-sm normal-case font-normal">
                                    Favorites
                                </Typography>
                            </Button>
                        </div>
                    </div>
                    {/* <AnimatePresence> */}
                    {
                        isFavorite ?
                            <div>
                                <motion.div
                                    initial={{ x: 200, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="p-5 border rounded-lg bg-white mt-10">
                                    <div className="flex items-center justify-between mb-10">
                                        <Typography variant="subtitle2">Favorite Partners</Typography>
                                    </div>
                                    <div className="flex justify-between flex-wrap">
                                        {
                                            favorite.length > 0 ?
                                                favorite.map((item: {
                                                    id: number,
                                                    nama: string,
                                                    created_at: Date,
                                                    deskripsi: string,
                                                    image_url: string
                                                }, index) => {
                                                    return (
                                                        <a key={index} href={`/partnerships/partner/${item.id}`} className="p-3 rounded-lg border w-full relative mb-4 hover:shadow-lg transition duration-200">
                                                            <FaHeart className="absolute top-5 right-5 fill-red-500" />
                                                            <div className="flex items-start">
                                                                <img className="w-[100px] mr-3 rounded-xl" alt="logo" src={item.image_url === null ? 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80' : item.image_url} />
                                                                <div>
                                                                    <Typography variant="body1">{item.nama}</Typography>
                                                                    <Typography className="font-semibold text-[12px]">
                                                                        Added on : <span className="font-normal">{formatDate(item.created_at)}</span>
                                                                    </Typography>
                                                                    <Typography variant="paragraph" className="mt-2">
                                                                        {item.deskripsi}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            {/* <div className="w-full flex justify-end">
                                            <Button className="mt-2 normal-case font-normal">Ajukan mitra</Button>
                                            </div> */}
                                                        </a>
                                                    )
                                                })
                                                :
                                                <div className="flex flex-col items-center mt-5 w-full">
                                                    <img src="/images/riwayat/notFound.png" alt="not found" className="w-[200px]" />
                                                    <Typography variant="subtitle2" className="my-2">Hmm...</Typography>
                                                    <Typography variant="paragraph" className="text-gray-500">Belum ada partner favorit nih</Typography>
                                                </div>
                                        }
                                    </div>
                                    <hr className="my-5" />
                                    <div className="flex flex-col">
                                        <div className="flex items-center m-4">
                                            <div className="p-2 bg-gray-200 rounded-full">
                                                <BiMailSend size={20} />
                                            </div>
                                            <div className="ml-4">
                                                <Typography className="font-semibold">Istanbul, Izmir, Ankara, Turkey, US, Europe</Typography>
                                                <Typography className="text-gray-500 text-sm">location</Typography>
                                            </div>
                                        </div>
                                        <div className="flex items-center m-4">
                                            <div className="p-2 bg-gray-200 rounded-full">
                                                <BiMailSend size={20} />
                                            </div>
                                            <div className="ml-4">
                                                <Typography className="font-semibold">Remote, Fulltime, Part-time, Internship</Typography>
                                                <Typography className="text-gray-500 text-sm">mail address</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            :
                            <motion.div
                                initial={{ x: 200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="p-5 border rounded-lg bg-white mt-10">
                                <div className="flex items-center justify-between mb-10">
                                    <Typography variant="subtitle2">All Personal Informations</Typography>
                                    <Button startIcon={<FaEdit />} onClick={() => setVisible(true)}>Edit</Button>
                                </div>
                                <div className="flex justify-between flex-wrap">
                                    <div className="flex items-center md:w-[40%] m-4">
                                        <div className="p-2 bg-gray-200 rounded-full">
                                            <BiMailSend size={20} />
                                        </div>
                                        <div className="ml-4">
                                            <Typography className="font-semibold">{user.email}</Typography>
                                            <Typography className="text-gray-500 text-sm">mail address</Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center md:w-[40%] m-4">
                                        <div className="p-2 bg-gray-200 rounded-full">
                                            <BiPhoneOutgoing size={20} />
                                        </div>
                                        <div className="ml-4">
                                            <Typography className="font-semibold">{user.no_telp}</Typography>
                                            <Typography className="text-gray-500 text-sm">phone number</Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center md:w-[40%] m-4">
                                        <div className="p-2 bg-gray-200 rounded-full">
                                            <BiCalendar size={20} />
                                        </div>
                                        <div className="ml-4">
                                            <Typography className="font-semibold">{user.tanggal_lahir !== undefined && formatDate(new Date(user.tanggal_lahir))}</Typography>
                                            <Typography className="text-gray-500 text-sm">Date of Birth</Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center md:w-[40%] m-4">
                                        <div className="p-2 bg-gray-200 rounded-full">
                                            <BsInstagram size={20} />
                                        </div>
                                        <div className="ml-4">
                                            <Typography className="font-semibold text-blue-600 underline">
                                                <a href={`https://www.instagram.com/${user.username_ig}`} target="_blank" rel="noreferrer">Click here</a>
                                            </Typography>
                                            <Typography className="text-gray-500 text-sm">Instagram account</Typography>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-5" />
                                <div className="flex flex-col">
                                    <div className="flex items-center m-4">
                                        <div className="p-2 bg-gray-200 rounded-full">
                                            <BiLocationPlus size={20} />
                                        </div>
                                        <div className="ml-4">
                                            <Typography className="font-semibold">{user.address}</Typography>
                                            <Typography className="text-gray-500 text-sm">location</Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center m-4">
                                        <div className="p-2 bg-gray-200 rounded-full">
                                            <BiMailSend size={20} />
                                        </div>
                                        <div className="ml-4">
                                            <Typography className="font-semibold">Remote, Fulltime, Part-time, Internship</Typography>
                                            <Typography className="text-gray-500 text-sm">mail address</Typography>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                    }
                    {/* </AnimatePresence> */}
                </div>
                <div className="md:w-[32%] sticky top-24">
                    <div className="p-5 border rounded-lg bg-white">
                        <div className=" flex items-center">
                            <div className="rounded-full w-14 h-14 bg-center bg-cover mr-5" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80')` }} />
                            <div>
                                <Typography variant="body1">
                                    {user.nama_depan + " " + user.nama_belakang} <span className="text-[12px]">(24)</span>
                                </Typography>
                                <Typography variant="body2">
                                    {user.email}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex items-center mt-7">
                            <Button startIcon={<MdPreview size={20} />} className="mr-3 bg-purple-600 border-none hover:bg-purple-600 rounded-full" active>
                                <Typography className="text-sm normal-case font-normal">
                                    Overview
                                </Typography>
                            </Button>
                            <Button startIcon={<FaHandshake size={20} />} className="mr-3 bg-transparent hover:bg-transparent text-gray-500 border-none rounded-full">
                                <Typography className="text-sm normal-case font-normal">
                                    Favorites
                                </Typography>
                            </Button>
                        </div>
                    </div>

                    <div className="p-5 border rounded-lg bg-white mt-10">
                        <Typography variant="subtitle2">Personal Information</Typography>
                        <div className="flex items-center m-4">
                            <div className="p-2 bg-gray-200 rounded-full">
                                <BiMailSend size={20} />
                            </div>
                            <div className="ml-4">
                                <Typography className="font-semibold">Remote, Fulltime</Typography>
                                <Typography className="text-gray-500 text-sm">mail address</Typography>
                            </div>
                        </div>
                        <hr className="my-3" />
                        <div className="flex items-center m-4">
                            <div className="p-2 bg-gray-200 rounded-full">
                                <BiMailSend size={20} />
                            </div>
                            <div className="ml-4">
                                <Typography className="font-semibold">Remote, Fulltime</Typography>
                                <Typography className="text-gray-500 text-sm">mail address</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Profile;