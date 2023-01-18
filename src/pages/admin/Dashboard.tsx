import { Avatar, Stats } from "react-daisyui";
import AdminLayout from "../../components/layout/AdminLayout";
import Typography from "../../components/Typography/Typography";
import axios from "axios";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.random()),
            backgroundColor: 'rgba(244, 114, 182, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => Math.random()),
            backgroundColor: 'rgba(126, 34, 206, 0.5)',
        },
    ],
};

const Dashboard = () => {
    const [partner, setPartner] = React.useState({ total: 0, total_pengajuan_berhasil: 0 });

    let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

    React.useEffect(() => {
        axios.get('http://localhost:3333/api/partner/get?role=partner', {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(res => {
                console.log(res)
                setPartner(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [userData.token])

    return (
        <AdminLayout pageName="Dashboard">
            <Stats className="shadow w-full font-sans lg:stats-horizontal stats-vertical">
                <Stats.Stat>
                    <Stats.Stat.Item variant="figure" className="text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-8 h-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                        </svg>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="title">Total Pengajuan</Stats.Stat.Item>
                    <Stats.Stat.Item variant="value" className="text-primary">
                        {partner.total}
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">21% more than last month</Stats.Stat.Item>
                </Stats.Stat>

                <Stats.Stat>
                    <Stats.Stat.Item variant="figure" className="text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-8 h-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="title">Pengajuan berhasil</Stats.Stat.Item>
                    <Stats.Stat.Item variant="value" className="text-secondary">
                        {partner.total_pengajuan_berhasil}
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">21% more than last month</Stats.Stat.Item>
                </Stats.Stat>

                <Stats.Stat>
                    <Stats.Stat.Item variant="figure" className="text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-8 h-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                        </svg>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="figure" className=" text-secondary">
                        <Avatar
                            size="sm"
                            online={true}
                            src={userData.image_url}
                            shape="circle"
                        ></Avatar>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="value">86%</Stats.Stat.Item>
                    <Stats.Stat.Item variant="title">Tasks done</Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc" className="text-secondary">
                        31 tasks remaining
                    </Stats.Stat.Item>
                </Stats.Stat>
            </Stats>

            <div className="flex md:items-center justify-between md:flex-row flex-col w-full">
            </div>
            <div className='overflow-x-auto bg-white p-5 mt-10 rounded-xl shadow'>
                <Typography variant="body1" className="mb-5">Users</Typography>
                <div className="flex items-center">
                    <Bar options={options} data={data} />
                </div>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;