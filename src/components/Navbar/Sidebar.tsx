import { useNavigate } from 'react-router-dom'
import React from 'react';

interface Props {
    isSidebarOpen: boolean,
    setIsSidebarOpen: Function
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('Authorization')

        setTimeout(() => {
            navigate('/admin/login')
        }, 1500);
    }

    const sidebarData = [
        {
            name: 'Home',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>,
            action: () => navigate('/admin/dashboard'),
            href: '/admin/dashboard'
        },
        // {
        //     name: 'Todos',
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        //     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        //   </svg>,
        //     action: () => navigate('/admin/todos'),
        //     href: '/admin/todos'
        // },
        {
            name: 'Toggle dark mode',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>,
            action: () => {}
        },
        {
            name: 'Logout',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>,
            action: handleLogout
        },
    ]

    return (
        <>
            <div className={`font-poppins z-50 fixed top-0 min-h-screen bg-white dark:bg-slate-800 p-4 md:min-w-[250px] shadow-lg transition duration-200 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 min-w-full' : 'translate-x-[-800px]'}`}>
                <div className='flex items-center justify-between'>
                    <a href='/'><h1 className="text-2xl font-bold dark:text-slate-300">CRUD Province</h1></a>
                    <button className='md:hidden' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <ul className='mt-10'>
                    {
                        sidebarData.map((data, index) => {
                            return (
                                <li onClick={data.action} key={index} className={`${window.location.pathname === data.href ? 'bg-purple-400 dark:bg-purple-700 dark:text-slate-200 text-white' : 'dark:text-white dark:hover:bg-purple-700 dark:hover:text-slate-200'} flex items-center justify-start p-3 rounded-xl my-4 cursor-pointer hover:bg-purple-300 hover:text-white transition duration-500`}>
                                    {data.icon}
                                    <p className='ml-5'>{data.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    );
}

export default Sidebar;