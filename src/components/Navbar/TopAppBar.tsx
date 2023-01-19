import React from 'react';
import { Avatar, Input, Menu } from 'react-daisyui';
import Typography from '../Typography/Typography';
import { IoMdNotifications } from "react-icons/io";
import { BiEditAlt, BiHistory, BiLogOutCircle, BiSearch } from 'react-icons/bi';
import axios from 'axios';

interface Props {
    isSidebarOpen: boolean,
    setIsSidebarOpen: Function
}

const TopAppBar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
    const [isVisible, setIsVisible] = React.useState(false);

    let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

    const handleLogout = () => {
        axios.post(`http://localhost:3333/api/partner/logout`, {}, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(res => {
                console.log(res);
                window.localStorage.removeItem('Authorization')

                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            })
            .catch(err => {
                alert(err.message)
            })
    }

    return (
        <div className="fixed top-0 w-full flex items-center p-5 justify-between bg-white dark:bg-slate-800 z-40 dark:text-slate-300">
            <Typography variant='subtitle2' className='md:block hidden'>Adonis Todo App</Typography>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='md:hidden block'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <div className='md:w-[60%] w-[50%] flex items-center'>
                <BiSearch />
                <Input className='w-full border-none focus:outline-none' placeholder='Search...' />
            </div>
            <div className='w-[20%] flex justify-end items-center'>
                <IoMdNotifications size={25} className="mr-5" />
                <div className='relative'>
                    <Avatar online onClick={() => setIsVisible(!isVisible)} className="cursor-pointer" size={'sm'} shape="circle" src={userData.image_url} />
                    {
                        isVisible &&
                        <Menu className='absolute bg-white p-5 right-0 min-w-[300px] shadow-lg rounded-box'>
                            <Menu.Item className='hover-bordered rounded-none'>
                                <div>
                                    <BiHistory />
                                    History
                                </div>
                            </Menu.Item>
                            <Menu.Item className='hover-bordered'>
                                <div>
                                    <BiEditAlt />
                                    Edit Profile
                                </div>
                            </Menu.Item>
                            <Menu.Item onClick={handleLogout} className='hover-bordered focus:fill-white'>
                                <div>
                                    <BiLogOutCircle />
                                    Logout
                                </div>
                            </Menu.Item>
                        </Menu>
                    }
                </div>
            </div>
        </div>
    );
}

export default TopAppBar;