import React from "react";
import { Steps } from "react-daisyui";
import { Swiper, SwiperSlide } from "swiper/react";
import AppLayout from "../../../components/layout/AppLayout";
import Typography from "../../../components/Typography/Typography";
import Progress1 from "./Progress1";
import Progress2 from "./Progress2";
// swiper
import { Navigation } from "swiper";
import { Swiper as SwiperType } from "swiper";
import 'swiper/css';
import Progress3 from "./Progress3";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProgressStep = () => {
    const navigate = useNavigate();
    const { id_partner } = useParams();
    const [stepNumber, setStepNumber] = React.useState(1);
    const swiperRef = React.useRef<SwiperType>();
    const [namaAcara, setNamaAcara] = React.useState('');
    const [jenisAcara, setJenisAcara] = React.useState('');
    const [tanggal, setTanggal] = React.useState<Date>();
    const [waktu, setWaktu] = React.useState<any>();
    const [deskripsiAcara, setDeskripsiAcara] = React.useState('');
    const [instansi, setInstansi] = React.useState('');
    const [tempat, setTempat] = React.useState('');

    const steps = [
        {
            id: 1,
            name: 'Lengkapi Data Pribadi'
        },
        {
            id: 2,
            name: 'Lengkapi Data Acara'
        },
        {
            id: 3,
            name: 'Lengkapi Dokumen'
        },
    ]

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        
        let Storage = window.localStorage.getItem('Authorization')

        let user = Storage !== null ? JSON.parse(Storage || "") : ''

        axios.post('http://localhost:3333/api/pengajuan/create', {
            nama_acara: namaAcara,
            jenis_acara: jenisAcara,
            tanggal: tanggal,
            waktu: waktu,
            id_partner: id_partner,
            deskripsi_acara: deskripsiAcara,
            instansi: instansi,
            tempat: tempat
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            console.log(res);

            Swal.fire('Success', 'Sukses mengirim datamu. Partner akan segera menanggapi', 'success')

            setTimeout(() => {
                navigate('/partnership/riwayat')
            }, 2000);
        })
        .catch(err => {
            console.log(err);

            Swal.fire('Error', err.message, 'error')
        })
    }

    return (
        <AppLayout>
            <div className="w-full flex items-center mt-10 flex-col">
                <Typography variant="subtitle1">Verifikasi Pengajuan</Typography>
                <Steps className="my-14">
                    {
                        steps.map((item, index) => {
                            return (
                                <Steps.Step onClick={() => {
                                    if (swiperRef.current !== undefined)
                                        swiperRef.current.slideTo(index)
                                }}
                                    className="cursor-pointer"
                                    color={item.id <= stepNumber ? "primary" : "ghost"} key={index}>{item.name}</Steps.Step>
                            )
                        })
                    }
                </Steps>
            </div>
            <form className="mx-auto md:w-[70%]" onSubmit={handleSubmit}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(res) => { setStepNumber(res.activeIndex + 1) }}
                >
                    <SwiperSlide className="px-3">
                        <Progress1 swiperRef={swiperRef} />
                    </SwiperSlide>
                    <SwiperSlide className="px-3">
                        <Progress2 
                        setNamaAcara={setNamaAcara}
                        setJenisAcara={setJenisAcara}
                        setTempat={setTempat}
                        setTanggal={setTanggal}
                        setWaktu={setWaktu}
                        setInstansi={setInstansi}
                        setDeskripsi={setDeskripsiAcara}
                        swiperRef={swiperRef} />
                    </SwiperSlide>
                    <SwiperSlide className="px-3">
                        <Progress3 swiperRef={swiperRef} />
                    </SwiperSlide>
                </Swiper>
            </form>
        </AppLayout>
    );
}

export default ProgressStep;