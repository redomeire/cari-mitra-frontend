import ChatCardPartner from "../../components/Chat/ChatCardPartner";
import AdminLayout from "../../components/layout/AdminLayout";
import Typography from "../../components/Typography/Typography";
import React from "react"
import { useParams } from "react-router-dom";
import { Badge, Button, Form, Select } from "react-daisyui";
import axios from "axios";
import { Socket } from "socket.io-client";
import { BiChat } from "react-icons/bi";
import { AiFillFileText } from "react-icons/ai";
import { formatDate } from "../../utils/dateFormatter";
import Swal from "sweetalert2";

const Partnership = ({ socket }: { socket: Socket }) => {
    let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")
    const { id } = useParams();
    const [isChatroomExist, setIsChatroomExist] = React.useState(false);
    const [isTyping, setIsTyping] = React.useState(false);
    const [strAmount, setStrAmount] = React.useState(200);
    const [status, setStatus] = React.useState('');
    const [newMessageExist, setNewMessageExist] = React.useState(false);
    const [messages, setMessages] = React.useState<{
        id: number,
        id_chat?: number,
        text_message: string,
        sent_by_partner: boolean,
        created_at: Date
    }[]>([]);
    const [data, setData] = React.useState({
        id: '',
        id_chat: '',
        id_pengajuan: '',
        nama_depan: '',
        nama_belakang: '',
        deskripsi_acara: '',
        instansi: '',
        jenis_acara: '',
        nama: '',
        nama_acara: '',
        created_at: new Date(),
        status: ''
    })

    React.useEffect(() => {
        axios.get(`http://localhost:3333/api/pengajuan/get/details/${id}`, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then((result) => {
                console.log(result);
                setMessages(result.data.message)
                setData(result.data.data[0])
            }).catch((err) => {
                console.error(err);
            })
    }, [id, userData.token])

    React.useEffect(() => {
        socket.on(`client:room:${id}`, (data) => {
            setIsChatroomExist(true)
            console.log('chat room created : ' + data)
        })
        socket.on(`client:chat:${data.id_chat}`, (data) => {
            setMessages((prev) => [...prev, data])
            
            if(!data.sent_by_partner)
                setNewMessageExist(true)
        })
    }, [socket, id, data.id_chat])

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log(`token: ${userData.id}`)

        axios.put('http://localhost:3333/api/pengajuan/update', {
            id: id,
            status: status
        }, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then((result) => {
                console.log(result);
                Swal.fire('Success', `Success updating status to ${status}`, 'success')
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }).catch((err) => {
                Swal.fire('Error', `${err.message}`, 'error')
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            });
    }

    return (
        <AdminLayout>
            <div className=" bg-white rounded-lg relative p-5">
                <Typography variant="subtitle1">{data.nama_acara}</Typography>
                <Typography variant="paragraph" className="text-gray-500 my-3">{formatDate(data.created_at)}</Typography>
                <Badge variant="outline" color={
                    data.status === "berhasil" ? 'info'
                        : data.status === "berlangsung" ? 'primary'
                            : data.status === "selesai" ? 'success'
                                : data.status === "gagal" ? 'error'
                                    : 'primary'
                } className="mb-10">{data.status}</Badge>
                <div className="flex items-start justify-between">
                    <div className="md:w-[45%]">
                        <Typography variant="body1" className="mb-5">Informasi Pengajuan</Typography>
                        <table cellPadding={10} className="mb-5 text-sm">
                            <tbody>
                                <tr>
                                    <td className="text-gray-400 font-semibold">ID Pengajuan</td>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-400 font-semibold">Nama Pengaju</td>
                                    <td>{data.nama_depan + " " + data.nama_belakang}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-400 font-semibold">Jenis Acara</td>
                                    <td>{data.jenis_acara}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-400 font-semibold">Tanggal pengajuan</td>
                                    <td>{formatDate(data.created_at)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Typography variant="body1" className="mt-10 mb-5">Deskripsi Acara</Typography>
                        <Typography variant="paragraph" className="mt-5 text-gray-500 leading-6">
                            {data.deskripsi_acara.substring(0, strAmount)} {data.deskripsi_acara.length > strAmount ? '...' : ''}
                        </Typography>
                        {
                            strAmount <= 200 ?
                                <span onClick={() => {
                                    setStrAmount(data.deskripsi_acara.length)
                                }} className="font-semibold text-sm cursor-pointer hover:text-purple-500 transition duration-200">Read More</span>
                                :
                                <span onClick={() => {
                                    setStrAmount(200)
                                }} className="font-semibold text-sm cursor-pointer hover:text-purple-500 transition duration-200">Read Less</span>
                        }
                    </div>
                    <div className="md:w-[45%] ">
                        <Typography variant="body1">Berkas Pengajuan</Typography>
                        <div className="w-full flex items-start mt-3">
                            <div className="mr-2">
                                <div className="p-6 mr-2 rounded-lg bg-purple-200 flex items-center justify-center md:min-w-[150px] md:min-h-[150px]">
                                    <AiFillFileText size={50} />
                                </div>
                                <Typography className="text-center mt-2" variant="paragraph">Proposal</Typography>
                            </div>
                            <div>
                                <div className="p-6 mr-2 rounded-lg bg-purple-200 flex items-center justify-center md:min-w-[150px] md:min-h-[150px]">
                                    <AiFillFileText size={50} />
                                </div>
                                <Typography className="text-center mt-2" variant="paragraph">Surat Pengantar</Typography>
                            </div>
                        </div>
                        <div className="border p-3 bg-violet-100 rounded-lg mt-7 md:w-[320px]">
                            <Typography variant="body1" className="mb-4">Status Pengajuan {data.status}</Typography>
                            <Form onSubmit={handleSubmit}>
                                <Select
                                    // value={data.status}
                                    defaultValue={data.status}
                                    onChange={(event) => setStatus(event.target.value)}
                                >
                                    <Select.Option value={'default'} disabled>
                                        Pick your favorite Simpson
                                    </Select.Option>
                                    <Select.Option selected={data.status === 'berlangsung'} value={'berlangsung'}>berlangsung</Select.Option>
                                    <Select.Option selected={data.status === 'berhasil'} value={'berhasil'}>berhasil</Select.Option>
                                    <Select.Option selected={data.status === 'selesai'} value={'selesai'}>selesai</Select.Option>
                                    <Select.Option selected={data.status === 'gagal'} value={'gagal'}>gagal</Select.Option>
                                </Select>
                                {/* <div className="flex items-center my-2">
                                    <Radio onChange={e => setStatus(e.target.value)} value="berlangsung" defaultChecked={data.status === "berlangsung" ? true : false} size="sm" color="primary" name="status" />
                                    <div className="ml-5">
                                        <Typography className="font-bold text-[15px] mb-1">Berlangsung</Typography>
                                        <Typography className="text-[12px]">Pilih ini jika pengajuan masih dalam tahap berjalan</Typography>
                                    </div>
                                </div>
                                <div className="flex items-center my-2">
                                    <Radio value="berhasil" onChange={(e) => setStatus(e.target.value)} defaultChecked={data.status === 'berhasil' ? true : false} color="info" size="sm" name="status" />
                                    <div className="ml-5">
                                        <Typography className="font-bold text-[15px] mb-1">Berhasil</Typography>
                                        <Typography className="text-[12px]">Pilih ini jika pengajuan masih dalam tahap berhasil</Typography>
                                    </div>
                                </div>
                                <div className="flex items-center my-2">
                                    <Radio value="selesai" onChange={(e) => setStatus(e.target.value)} defaultChecked={data.status === 'selesai'} color="success" size="sm" name="status" />
                                    <div className="ml-5">
                                        <Typography className="font-bold text-[15px] mb-1">Selesai</Typography>
                                        <Typography className="text-[12px]">Pilih ini jika S&K terpenuhi dan proses pengajuan selesai</Typography>
                                    </div>
                                </div>
                                <div className="flex items-center my-2">
                                    <Radio value="gagal" onChange={(e) => setStatus(e.target.value)} defaultChecked={data.status === 'gagal'} color="error" size="sm" name="status" />
                                    <div className="ml-5">
                                        <Typography className="font-bold text-[15px] mb-1">Gagal</Typography>
                                        <Typography className="text-[12px]">Pilih ini jika ingin menghentikan pengajuan</Typography>
                                    </div>
                                </div> */}
                                <Button className="mt-2" type="submit">Update</Button>
                            </Form>
                        </div>
                    </div>
                </div>
                {
                    isChatroomExist ?
                        <ChatCardPartner
                            setIsTyping={setIsTyping}
                            isTyping={isTyping}
                            socket={socket}
                            messages={messages}
                            setMessages={setMessages}
                            id={data.id_chat}
                            setIsChatroomExist={setIsChatroomExist}
                            user={{ image_url: '', nama: data.nama_depan + " " + data.nama_belakang }}
                        />
                        :
                        <div className="fixed bottom-10 right-5">
                            <div className="relative">
                                {
                                    !newMessageExist &&
                                    <div className="w-[12px] h-[12px] rounded-full bg-green-400 absolute right-1 z-20" />
                                }
                                <Button onClick={() => { setIsChatroomExist(true) }} className='rounded-full p-3 h-fit min-h-fit' color="primary">
                                    <BiChat size='30px' />
                                </Button>
                            </div>
                        </div>
                }
            </div>
        </AdminLayout>
    );
}

export default Partnership;