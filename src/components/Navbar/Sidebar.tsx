import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Typography from '../Typography/Typography';
import { FaApple, FaUserAlt } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { AiFillPieChart } from 'react-icons/ai';
import { Button } from 'react-daisyui';
import { FcGoogle } from 'react-icons/fc';

interface Props {
    isSidebarOpen: boolean,
    setIsSidebarOpen: Function
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

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

    const sidebarData = [
        {
            name: 'Overview',
            icon: <AiFillPieChart/>,
            action: () => navigate('/partner/dashboard'),
            href: '/partner/dashboard'
        },
        {
            name: 'Pengajuan',
            icon: <FaUserAlt />,
            action: () => navigate('/partner/pengajuans'),
            href: '/partner/pengajuans'
        },
        {
            name: 'dark',
            icon: <MdDarkMode/>,
            action: () => {}
        },
        {
            name: 'Logout',
            icon: <FiLogOut/>,
            action: handleLogout
        },
    ]

    return (
        <>
            <div className={`font-poppins z-50 fixed top-0 min-h-screen bg-white dark:bg-slate-800 p-4 md:min-w-[200px] transition duration-200 md:translate-x-0 overflow-auto ${isSidebarOpen ? 'translate-x-0 min-w-full' : 'translate-x-[-800px]'}`}>
                <div className='flex items-center justify-between'>
                    <a href='/' className='flex items-center'>
                        <img src='/images/logo.svg' alt='logo' className='w-[30px]'/>
                        <h1 className="text-2xl font-bold dark:text-slate-300 ml-2">Cari Mitra</h1>
                        </a>
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
                                <li onClick={data.action} key={index} className={`${window.location.pathname === data.href ? 'bg-purple-700 dark:bg-purple-700 dark:text-slate-200 text-white' : 'dark:text-white dark:hover:bg-purple-700 dark:hover:text-slate-200'} flex items-center justify-start p-3 rounded-xl my-4 cursor-pointer hover:bg-purple-700 hover:text-white transition duration-500`}>
                                    <div className={`${ window.location.pathname === data.href ? 'fill-purple-700' : '' }`}>{data.icon}</div>
                                    <Typography className='ml-5' variant='paragraph'>{data.name}</Typography>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className='mt-14 md:w-full'>
                    <div className='bg-cover bg-center w-full h-[100px] rounded-t-xl' style={{ backgroundImage: `url('https://img.freepik.com/free-vector/cute-astronaut-dance-cartoon-vector-icon-illustration-technology-science-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3851.jpg?w=2000')` }}/>
                    <div className='p-3 text-center bg-purple-100 rounded-b-xl'>
                        <Typography className='font-semibold'>Get mobile app</Typography>
                        <div className='mt-3'>
                            <Button className='rounded-full bg-slate-100 border-none hover:bg-slate-200'><FcGoogle size={15}/> </Button>
                            <Button className='rounded-full ml-2 bg-slate-100 border-none hover:bg-slate-200'><FaApple size={15} className='fill-black'/> </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;