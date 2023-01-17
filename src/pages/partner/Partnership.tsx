import ChatCardPartner from "../../components/Chat/ChatCardPartner";
import AdminLayout from "../../components/layout/AdminLayout";
import Typography from "../../components/Typography/Typography";
import React from "react"
import { useParams } from "react-router-dom";
import { Button } from "react-daisyui";
import axios from "axios";
import { Socket } from "socket.io-client";

const Partnership = ({ socket }: { socket: Socket }) => {
    let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")
    const { id } = useParams();
    const [isChatroomExist, setIsChatroomExist] = React.useState(true);
    const [messages, setMessages] = React.useState<{
        id_chat?: number,
        text_message: string,
        sent_by_partner: boolean,
        created_at: Date
    }[]>([]);

    React.useEffect(() => {
        axios.get(`http://localhost:3333/api/pengajuan/get/details/${id}`, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
        .then((result) => {
            console.log(result);
            setMessages(result.data.message)
        }).catch((err) => {
            console.error(err);
        })
    }, [id, userData.token])

    React.useEffect(() => {
        socket.on('client:room', (data) => {
            setIsChatroomExist(true)
            console.log('chat room created : ' + data)
        })
        socket.on('client:chat', (data) => setMessages((prev) => [...prev, data]))
    }, [socket])

    return ( 
        <AdminLayout>
            <Typography>halo</Typography>
            <div className="relative md:w-[400px]">
            {
                isChatroomExist ? 
                <ChatCardPartner
                messages={messages}
                setMessages={setMessages}
                id={id}
                setIsChatroomExist={setIsChatroomExist}
                user={{ image_url: '', nama: 'Redo' }}
                />
                :
                <Button onClick={() => setIsChatroomExist(true)}>Open chat</Button>
            }
            </div>
        </AdminLayout>
     );
}
 
export default Partnership;