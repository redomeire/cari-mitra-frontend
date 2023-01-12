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

interface User {
    nama_depan?: string,
    nama_belakang?: string,
    tanggal_lahir?: any,
    address?: string
    no_telp?: string
    username_ig?: string
}

const ProgressStep = () => {
    let Storage = window.localStorage.getItem('Authorization')

    let user = Storage !== null ? JSON.parse(Storage || "") : ''

    const navigate = useNavigate();
    const { id_partner } = useParams();
    const [userData, setUserData] = React.useState<User>({})
    const [isNull, setIsNull] = React.useState<boolean>(false);

    const [stepNumber, setStepNumber] = React.useState(2);
    const swiperRef = React.useRef<SwiperType>();
    const [namaAcara, setNamaAcara] = React.useState('');
    const [jenisAcara, setJenisAcara] = React.useState('');
    const [tanggal, setTanggal] = React.useState<Date>();
    const [waktu, setWaktu] = React.useState<any>();
    const [deskripsiAcara, setDeskripsiAcara] = React.useState('');
    const [instansi, setInstansi] = React.useState('');
    const [tempat, setTempat] = React.useState('');

    React.useEffect(() => {
        console.log(stepNumber)
    }, [stepNumber])

    React.useEffect(() => {
        axios.get('http://localhost:3333/api/auth/user', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                console.log(res)

                setUserData(res.data.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

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

    React.useEffect(() => {
        const newArray: any[] = [];

        Object.keys(userData).forEach((item: string) => {
            if (item !== 'remember_me_token')
                newArray.push(userData[item as keyof User])
        })

        if (newArray.includes(null)) {
            setIsNull(true)
            Swal.fire('Error', 'fill your data first')
            setStepNumber(1)
        }

        else swiperRef.current?.slideTo(0)
    }, [userData])

    return (
        <AppLayout>
            <div className="w-full flex items-center mt-10 flex-col">
                <Typography variant="subtitle1">Verifikasi Pengajuan</Typography>
                <Steps className="my-14">
                    {
                        steps.map((item, index) => {
                            return (
                                <Steps.Step onClick={() => {
                                    if (swiperRef.current !== undefined) {
                                        if (index > 0 && !isNull) {
                                            swiperRef.current.slideTo(index - 1)
                                            setStepNumber(index + 1)
                                        }
                                    }
                                }}
                                    className="cursor-pointer"
                                    color={item.id <= stepNumber ? "primary" : "ghost"} key={index}>{item.name}</Steps.Step>
                            )
                        })
                    }
                </Steps>
            </div>
            <div className="mx-auto md:w-[70%]">
                {
                    isNull ?
                        <Progress1
                            userData={userData}
                        />
                        :
                        <form onSubmit={handleSubmit}>

                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            allowTouchMove={false}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                        >
                                <SwiperSlide className="px-3">
                                    <Progress2
                                        setStepNumber={setStepNumber}
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
                                    <Progress3
                                    setStepNumber={setStepNumber}
                                    swiperRef={swiperRef} />
                                </SwiperSlide>
                        </Swiper>
                            </form>
                }
            </div>
        </AppLayout>
    );
}

export default ProgressStep;