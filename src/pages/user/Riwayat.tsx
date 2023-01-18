import AppLayout from "../../components/layout/AppLayout";
import React from "react";
import axios from "axios";
import Typography from "../../components/Typography/Typography";
import { Button } from "react-daisyui";
import { formatDate } from "../../utils/dateFormatter";

const Riwayat = () => {
    const [riwayats, setRiwayats] = React.useState([]);
    const [filterRiwayat, setFilterRiwayat] = React.useState('semua');

    React.useEffect(() => {
        let Storage = window.localStorage.getItem('Authorization')

        let user = Storage !== null ? JSON.parse(Storage || "") : ''

        axios.get('http://localhost:3333/api/pengajuan/user/get/all?role=user', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            console.log(res);

            setRiwayats(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return ( 
        <AppLayout>
            <div className="mx-10 flex items-start relative">
                <FilterBar filterRiwayat={filterRiwayat} setFilterRiwayat={setFilterRiwayat}/>
                <div className="border bg-white p-4 pb-0 px-4 ml-4">
                    <Typography variant="subtitle1" className="mt-4">Lihat Riwayat anda di sini</Typography>
                    <Typography variant="body2" className="mt-5 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, accusamus harum amet error magnam odit dolor. Temporibus repellat voluptate pariatur.</Typography>
                <div className="mt-5">
                    {
                        riwayats.length > 0 ?
                        riwayats.filter((riwayat: { status: string }) => {
                            if(filterRiwayat === 'semua') return riwayats

                            return riwayat.status === filterRiwayat
                        }).map((item: {
                            id: string,
                            nama_acara: string,
                            nama: string,
                            image_url: string,
                            created_at: Date,
                            status: 'berlangsung' | 'gagal'
                        }, index) => {
                            return(
                                <a href={`/user/pengajuan/${item.id}/details`} key={index} className="p-4 rounded-lg border my-3 flex items-start">
                                    <img src={item.image_url !== null ? item.image_url : 'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80'} alt="partner"
                                    className="w-[80px] rounded-lg"
                                    />
                                    <div className="ml-5">
                                        <Typography variant="body1">{item.nama_acara}</Typography>
                                        <Typography variant="body2" className="mb-3">{item.nama}</Typography>
                                        <Typography variant="body2" className="text-gray-500">Dikirim pada {formatDate(item.created_at)}</Typography>
                                        <Button disabled className={`${item.status === 'berlangsung' ? 'disabled:bg-blue-100 disabled:text-black' : 'disabled:bg-gray-200 disabled:text-gray-500'} font-normal mt-3 rounded-full normal-case`}>{item.status}</Button>
                                    </div>
                                </a>
                            )
                        })
                        :
                        <div className="flex flex-col items-center mt-10">
                            <img src="/images/riwayat/notFound.png" alt="not found" className="w-[200px]"/>
                            <Typography variant="subtitle2" className="my-2">Hmm...</Typography>
                            <Typography variant="paragraph" className="text-gray-500"> Sepertinya anda belum melakukan partnership</Typography>
                        </div>
                    }
                </div>
                </div>
            </div>
        </AppLayout>
     );
}

const FilterBar = ({ filterRiwayat, setFilterRiwayat }: {
    filterRiwayat: string,
    setFilterRiwayat: Function
}) => {
    return (
        <div className="md:min-w-[20%] p-4 border w-fit bg-white sticky top-[85px]">
            <div className="food my-5">
                <Typography className="text-black font-bold mb-7 uppercase">Status</Typography>
                <div onClick={() => setFilterRiwayat('semua')} className={`cursor-pointer flex items-center p-3 my-3 ${filterRiwayat === 'semua' ? 'border-l-2 border-l-black' : ''}`}>
                    <Typography className="font-[500] text-sm uppercase">Semua</Typography>
                </div>
                <div onClick={() => setFilterRiwayat('berlangsung')} className={`cursor-pointer flex items-center p-3 my-3 ${filterRiwayat === 'berlangsung' ? 'border-l-2 border-l-black' : ''}`}>
                    <Typography className="font-[500] text-sm uppercase">Berlangsung</Typography>
                </div>
                <div onClick={() => setFilterRiwayat('gagal')}  className={`cursor-pointer flex items-center p-3 my-3 ${filterRiwayat === 'gagal' ? 'border-l-2 border-l-black' : ''}`}>
                    <Typography className="font-[500] text-sm uppercase">Gagal</Typography>
                </div>
            </div>
        </div>
    )
}
 
export default Riwayat;