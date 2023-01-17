import AppLayout from "../../../components/layout/AppLayout";
import { Socket } from "socket.io-client";
import { Button, Collapse, Tooltip } from "react-daisyui";
import Typography from "../../../components/Typography/Typography";

import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatCard from "../../../components/Chat/ChatCard";
import { formatDate } from "../../../utils/dateFormatter";

const PengajuanDetail = ({ socket }: { socket: Socket }) => {
    const { id } = useParams();
    const [isChatroomExist, setIsChatroomExist] = React.useState(true);
    const [isTyping, setIsTyping] = React.useState(false);
    const [data, setData] = React.useState<
        {
            deskripsi_acara: string,
            id: number,
            id_chat: string,
            id_partner: number,
            id_user: number,
            image_url: string,
            jenis_acara: "Dies natalis" | "seminar" | "lomba",
            nama: string,
            created_at: Date,
            nama_acara: string
        }>(
            {
                deskripsi_acara: '',
                id: 0,
                id_chat: '',
                id_partner: 0,
                id_user: 0,
                image_url: '',
                jenis_acara: "Dies natalis",
                nama: '',
                created_at: new Date(),
                nama_acara: ''
            });

    const [messages, setMessages] = React.useState<{
        id_chat?: number,
        text_message: string,
        sent_by_partner: boolean,
        created_at: Date
    }[]>([]);

    let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

    React.useEffect(() => {
        axios.get(`http://localhost:3333/api/pengajuan/get/details/${id}`, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(res => {
                console.log(res);
                setMessages(res.data.message)
                setData(res.data.data[0])
            })
            .catch(err => {
                console.error(err);
            })
    }, [id, userData.token])

    React.useEffect(() => {
        socket.on(`client:room:${id}`, (data) => {
            setIsChatroomExist(true)
            console.log('chat room created : ' + data)
        })
        socket.on(`client:chat:${data.id_chat}`, (data) => setMessages((prev) => [...prev, data]))

        return () => {
            socket.off(`user:typing:${data.id_chat}`, () => {
                setIsTyping(false)
            })
        }
    }, [socket, id, data.id_chat])

    const createChatroom = () => {
        let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

        axios.post(`http://localhost:3333/api/pengajuan/create/chatroom`, {
            id_pengajuan: id
        }, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <AppLayout>
            <div className="px-10 flex items-start justify-between w-full pt-10">
                <div className="p-5 border rounded-lg md:w-[63%]">
                    <Typography className="text-[30px] font-semibold">{data.nama_acara}</Typography>
                    <div className="my-5">
                        <Tooltip
                            position="right"
                            message="Sabar... transaksimu lagi diproses" className="disabled:bg-purple-700 disabled:text-white">
                            <Button>
                                <Typography variant="paragraph">berlangsung</Typography>
                                </Button>
                        </Tooltip>
                    </div>
                    <div>
                        <Typography variant="body1" className="mt-10">Informasi Pengajuan</Typography>
                        {/* <div className="flex items-start justify-between flex-wrap"> */}
                            <table cellPadding={10} className="mt-5">
                                <tr>
                                    <td className="text-gray-400 font-semibold">ID Pengajuan</td>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-400 font-semibold">Nama Pengaju</td>
                                    <td>{userData.nama_depan + " " + userData.nama_belakang}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-400 font-semibold">Partner</td>
                                    <td><a href={`/partnerships/partner/${data.id_partner}`} className="text-blue-500">{data.nama}</a></td>
                                </tr>
                                <tr>
                                    <td className="text-gray-400 font-semibold">Jenis Acara</td>
                                    <td>{data.jenis_acara}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-400 font-semibold">Tanggal pengajuan</td>
                                    <td>{formatDate(data.created_at)}</td>
                                </tr>
                            </table>
                                <div className="p-3 my-5">
                                    <Typography variant="body1">Deskripsi Acara</Typography>
                                    <Typography variant="paragraph" className="mt-3 leading-6">{data.deskripsi_acara}</Typography>
                                </div>
                                <div className="p-3">
                                    <Typography variant="body1" className="mb-4">SOP Partner</Typography>
                                    <Collapse icon="arrow" className="my-2">
                                        <Collapse.Title className="bg-purple-700 rounded-lg text-white">Minimal 20 akun Instagram</Collapse.Title>
                                        <Collapse.Content className="bg-purple-100 rounded-b-lg"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti fuga in, voluptatibus ea sit consequuntur distinctio recusandae. Aperiam, illum illo? </Collapse.Content>
                                    </Collapse>
                                    <Collapse icon="arrow" className="my-2">
                                        <Collapse.Title className="bg-purple-700 rounded-lg text-white">Menyediakan dana minimal Rp 10.000,00</Collapse.Title>
                                        <Collapse.Content>Judul</Collapse.Content>
                                    </Collapse>
                                </div>
                        {/* </div> */}
                    </div>
                </div>
                <div className="md:w-[35%] relative">
                    {isChatroomExist ?
                        <ChatCard
                            setIsTyping={setIsTyping}
                            isTyping={isTyping}
                            socket={socket}
                            partner={{ 
                                nama: data.nama,
                                image_url: data.image_url
                             }}
                            setIsChatroomExist={setIsChatroomExist}
                            messages={messages}
                            setMessages={setMessages}
                            id={data.id_chat} />
                        :
                        <Button onClick={createChatroom}>Start chatting</Button>
                    }
                </div>
            </div>
        </AppLayout>
    );
}

export default PengajuanDetail;