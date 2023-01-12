import React from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
// import Button from "../Button/Button";
import { Button } from "react-daisyui";
import Typography from "../Typography/Typography";
import { BsArrowRight } from "react-icons/bs";
import { MdLanguage } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const navbarDatas = [
    {
        name: 'Beranda',
        href: '/'
    },
    {
        name: 'Cari',
        href: '/partnerships/explore'
    },
    {
        name: 'Riwayat',
        href: '/user/history'
    },
    {
        name: 'Profil',
        href: '/user/profile'
    },
]

interface Props {
    status: string,
    visible: boolean,
    message: string
}

const Navbar = () => {
    const navigate = useNavigate()
    const [popup, setPopup] = React.useState<Props>({
        status: '',
        visible: false,
        message: ''
    })

    const handleLogout = () => {
        let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

        axios.post(`http://localhost:3333/api/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
        .then(res => {
            setPopup({
                status: 'success',
                visible: !popup.visible,
                message: 'success logout'
            })
    
            window.localStorage.removeItem('Authorization')
    
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        })
        .catch(err => {
            setPopup({
                status: 'error',
                visible: !popup.visible,
                message: 'error logout'
            })
        })
    }

    return (
        <nav className="flex items-center justify-between p-5 px-10 bg-white w-full fixed top-0 z-40">
            <div className="flex items-center">
                <a href="/" className="flex items-center mr-10">
                    <img src="/images/logo.svg" alt="logo cari mitra" className="w-10 h-10" />
                    <Typography variant="subtitle1" className="ml-2">CariMitra</Typography>
                </a>
                <ul className="flex items-center">
                    {
                        navbarDatas.map((data, index) => {
                            return (
                                <a href={data.href} key={index} className={`mx-3 transition duration-300 hover:text-purple-500 rounded-xl p-3 ${window.location.pathname === data.href && 'text-purple-500'}`}>
                                    <Typography variant="body2">
                                        {data.name}
                                    </Typography>
                                </a>
                            )
                        })
                    }
                </ul>
            </div>

            {
                window.localStorage.getItem('Authorization') ?
                    <div className="flex items-center">
                        <MdLanguage className="text-purple-500 mr-10 w-6 h-6" />
                        <a href="/partner/login" className="mr-10">
                            <Typography variant="body2" className="text-purple-500">For Partners</Typography>
                        </a>
                        <Button onClick={handleLogout} className="rounded-none normal-case bg-purple-600 hover:bg-purple-500 border-none" endIcon={<FiLogOut />}>
                            <Typography variant="body2">Log out</Typography>
                        </Button>
                    </div>
                    :
                    <div className="flex items-center">
                        <MdLanguage className="text-purple-500 mr-10 w-6 h-6" />
                        <a href="/partner/login" className="mr-10">
                            <Typography variant="body2" className="text-purple-500">For Partners</Typography>
                        </a>
                        <Button onClick={() => { navigate('/auth/login') }} className="rounded-none normal-case bg-purple-600 hover:bg-purple-500 border-none" endIcon={<BsArrowRight />}>
                            <Typography variant="body2">Start now</Typography>
                        </Button>
                    </div>
            }
            <Alert popup={popup} setPopup={setPopup} />
        </nav>
    );
}

export default Navbar;