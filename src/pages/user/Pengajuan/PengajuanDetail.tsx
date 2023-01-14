import AppLayout from "../../../components/layout/AppLayout";
import { Socket } from "socket.io-client";
import { Button, ChatBubble, Input } from "react-daisyui";
import Typography from "../../../components/Typography/Typography";
// import Input from "../../../components/Input/Input";

import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PengajuanDetail = ({ socket }: { socket: Socket }) => {
    const { id } = useParams();
    const [isChatroomExist, setIsChatroomExist] = React.useState(false);
    const [chatRoom, setChatRoom] = React.useState<{id: number}>({ id: 0 });

    React.useEffect(() => {
        socket.on('generateChatRoom', (data) => {
            setIsChatroomExist(true)
            console.log('chat room created : ' + data)
        })
    }, [socket])

    const createChatroom = () => {
        socket.emit('createChatRoom', {
            id_pengajuan: id
        })
    }

    return (
        <AppLayout>
            <div className="mt-5 w-[75%] mx-auto relative">
                {isChatroomExist ?
                    <>
                        <div className="bg-black text-white p-3 flex justify-center rounded-t-lg">
                            <Typography variant="body1">Ini header</Typography>
                        </div>
                        <div className="border max-h-[400px] min-h-[400px] overflow-auto">
                            <ChatSection socket={socket} id={id} />
                        </div>
                    </>
                    :
                    <Button onClick={createChatroom}>Start chatting</Button>
                }
            </div>
        </AppLayout>
    );
}

const ChatSection = ({ socket, id }: { socket: Socket, id: string | undefined }) => {
    const [messages, setMessages] = React.useState<{ id_chat: number, text_message: string, sent_by_partner: boolean }[]>([]);
    const [message, setMessage] = React.useState('');
    const lastMessageRef = React.useRef<any>(null);

    React.useEffect(() => {
        socket.on('messageResponse', (data) => setMessages((prev) => [...prev, data]))
        socket.on('generateMessage', (data) => {
            console.log(data)
            setMessages((prev) => [...prev, data])
        })
    }, [socket])

    // React.useEffect(() => {
    //     let Storage = window.localStorage.getItem('Authorization')

    //     let user = Storage !== null ? JSON.parse(Storage || "") : ''
    //     // 👇️ scroll to bottom every time messages change
    //     axios.get(`http://localhost:3333/api/pengajuan/get/messages/${}`, {
    //         headers: {
    //             Authorization: `Bearer ${user.token}`,
    //         }
    //     })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, []);

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        socket.emit('storeMessage', {
            id_chat: id,
            text_message: message,
            sent_by_partner: false
        })
    }

    return (
        <div className="p-3 pb-16">
            <div>
                {
                    messages.map((item, index) => {
                        return (
                            <ChatBubble end={item.sent_by_partner ? false : true} key={index}>
                                <ChatBubble.Header>{item.id_chat}</ChatBubble.Header>
                                <ChatBubble.Message color="primary">{item.text_message}</ChatBubble.Message>
                                <ChatBubble.Footer>
                                    <ChatBubble.Time>You hours ago</ChatBubble.Time>
                                </ChatBubble.Footer>
                            </ChatBubble>
                        )
                    })
                }
            </div>
            <form ref={lastMessageRef} onSubmit={handleSubmit} className="text-section absolute bottom-0 right-0 left-0 flex items-center bg-white p-3">
                <Input placeholder="enter text here" className="w-full mr-2" onChange={e => setMessage(e.target.value)} />
                <Button className="mb-0" type="submit">Submit</Button>
            </form>
        </div>
    )
}
export default PengajuanDetail;