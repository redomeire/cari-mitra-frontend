import axios from "axios";
import React from "react";
import { Badge, Button } from "react-daisyui";
import { FaBuilding, FaPhone, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Typography from "../../components/Typography/Typography";
import { reviews } from "../../utils/dummy";

interface Props {
    nama: string,
    alamat: string,
    nilai: number,
    deskripsi: string,
    image_url: string,
    no_telp: string
}

const PartnerDetail = () => {
    const { id } = useParams();
    const [initialState, setInitialState] = React.useState<Props>({
        nama: '',
        alamat: '',
        nilai: 0,
        deskripsi: '',
        image_url: '',
        no_telp: ''
    });

    React.useEffect(() => {
        let Storage = window.localStorage.getItem('Authorization')

        let userData = Storage !== null ? JSON.parse(Storage || "") : ''

        axios.get(`http://localhost:3333/api/partner/get/${id}`, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(res => {
                console.log(res);
                setInitialState(res.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id])

    return (
        <AppLayout>
            <div className="px-10 pt-10">
                <div className="flex items-start">
                    <div style={{ backgroundImage: `url('${initialState.image_url}')` }} className="bg-cover bg-center w-24 h-24" />
                    <div className="ml-5">
                        <Typography variant="subtitle1" className="text-purple-700">{initialState.nama}</Typography>
                        <Typography variant="body1" className="my-2">PT Atask Teknologi Indonesia</Typography>
                        <Badge variant="outline" color="primary">Free</Badge>

                        <div className="flex mt-4 items-end">
                            <FaBuilding size="18px" className="pt-0" />
                            <Typography className="ml-2 text-[15px] leading-[1]">{initialState.alamat}</Typography>
                        </div>
                        <div className="flex mt-4 items-end">
                            <FaPhone size="18px" className="pt-0" />
                            <Typography className="ml-2 text-[15px] leading-[1]">{initialState.no_telp}</Typography>
                        </div>
                        <div className="flex mt-4 items-end">
                            <FaStar size="20px" className="pt-0 fill-yellow-400" />
                            <Typography className="ml-2 text-[15px] leading-[1] font-semibold">{initialState.nilai} / 5</Typography>
                            <Typography className="ml-2 text-[15px] leading-[1] text-gray-500">(110 ulasan)</Typography>
                        </div>
                        <Button className="mt-8 normal-case rounded-none">
                            <Typography variant="body2">Ajukan mitra</Typography>
                        </Button>
                    </div>
                </div>
                <hr className="my-10 h-[1px] bg-gray-200" />
                <div>
                    <Typography variant="subtitle2" className="mb-5">Deskripsi Partner</Typography>

                    <Typography className="md:w-[70%] leading-8 text-[15px]">{initialState.deskripsi}</Typography>
                </div>
                <div className="comments mt-5">
                    <Typography variant="subtitle2" className="mb-6">Comments</Typography>
                    <div className="max-h-[400px] overflow-auto pr-5">
                        {
                            reviews.map((review, index) => {
                                return (
                                    <div key={index} className='my-5'>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div
                                                    className="w-[35px] h-[35px] bg-cover bg-center rounded-full"
                                                    style={{ backgroundImage: `url(${review.thumbnail})` }} />
                                                <div className="ml-3">
                                                    <p className="font-semibold text-sm">{review.name}</p>
                                                    <div className="flex items-center">
                                                        <FaStar className="mr-2 fill-yellow-400" />
                                                        <FaStar className="mr-2 fill-yellow-400" />
                                                        <FaStar className="mr-2 fill-yellow-400" />
                                                        <FaStar className="mr-2 fill-yellow-400" />
                                                        <FaStar className="mr-2 fill-yellow-400" />
                                                        <p className="text-sm ml-2">5.0</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500">{review.time}</p>
                                        </div>
                                        <p className="mt-3 text-sm">{review.comment}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default PartnerDetail;