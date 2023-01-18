import React from "react";
import { Button, ChatBubble, Input } from "react-daisyui";
import { IoClose } from "react-icons/io5";
import { formatDate } from "../../utils/dateFormatter";
import Typography from "../Typography/Typography";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { Socket } from "socket.io-client";

const ChatCard = ({
    setIsTyping,
    isTyping,
    id,
    setIsChatroomExist,
    messages,
    partner,
    setMessages,
    socket
}: {
    setIsTyping: Function,
    isTyping: boolean,
    id: string | undefined,
    setIsChatroomExist: Function,
    partner: {
        nama: string,
        image_url: string
    },
    messages: {
        id_chat?: number,
        text_message: string,
        sent_by_partner: boolean,
        created_at: Date
    }[],
    setMessages: Function,
    socket: Socket
}) => {
    const [message, setMessage] = React.useState('');
    const [emojiVisible, setEmojiVisible] = React.useState(false);
    const lastMessageRef = React.useRef<any>(null);
    const [isPartner, setIsPartner] = React.useState(false);

    let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        setMessage('')

        axios.post('http://localhost:3333/api/pengajuan/store/messages', {
            id_chat: id,
            text_message: message,
            sent_by_partner: false
        }, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
    }

    React.useEffect(() => {
        socket.on(`user:typing:${id}`, (data) => {
            console.log(id)
            // if(data.isPartner) {
                setIsPartner(data.isPartner)
                setIsTyping(true)
                setTimeout(() => {
                    setIsTyping(false)
                }, 3000);
            // }
        })
    }, [id, setIsTyping, socket])

    React.useEffect(() => {
        lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight
        // console.log(lastMessageRef)
    }, [messages, isTyping])

    return (
        <>
            <div className="hover:shadow-xl transition duration-200">
                <div className="bg-purple-600 text-white p-3 flex justify-center rounded-t-lg">
                    <Typography variant="body1">{partner.nama}</Typography>
                </div>
                <div className="border max-h-[400px] min-h-[400px] overflow-auto" ref={lastMessageRef}>
                    <div className="p-3 pb-16">
                        <div>
                            {
                                messages.length > 0 ?
                                    messages.map((item, index) => {
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ y: 50, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                className='my-2'
                                            >
                                                <ChatBubble end={item.sent_by_partner ? false : true} key={index}>
                                                    <ChatBubble.Avatar src={item.sent_by_partner ? partner.image_url : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'} />
                                                    <ChatBubble.Message color="primary">{item.text_message}</ChatBubble.Message>
                                                    <ChatBubble.Footer>
                                                        <ChatBubble.Time className="text-gray-900 opacity-70">{formatDate(item.created_at)}</ChatBubble.Time>
                                                    </ChatBubble.Footer>
                                                </ChatBubble>
                                            </motion.div>
                                        )
                                    })
                                    :
                                    <div className="w-full h-[300px] flex items-center justify-center flex-col">
                                        <img src="/images/search/not_found.png" alt="notfound" className="md:w-[150px]" />
                                        <Typography variant="body1" className="text-gray-500">Baru pertama kali chat?</Typography>
                                        <Typography variant="paragraph" className="text-gray-500">Mulai sesi chatmu sekarang</Typography>
                                    </div>
                            }
                            {
                                isTyping &&
                                <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: -20 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className={`flex ${ isPartner ? 'justify-start' : 'justify-end'} p-2 rounded-full`}>
                                    <div className="typing">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                </motion.div>
                            }
                        </div>
                        <form onSubmit={handleSubmit} className="text-section absolute bottom-0 right-0 left-0 flex items-center bg-white p-3 border">
                            <Input required value={message} placeholder="enter text here" className="w-full mr-2" onChange={e => {
                                setMessage(e.target.value)
                            }}
                                onKeyDown={() => {
                                socket.emit(`user:typing`, { isTyping: true, id: id, isPartner: false })
                                }}
                            />
                            <Button onClick={() => setEmojiVisible(!emojiVisible)} className="mb-0 bg-purple-600 border-none hover:bg-purple-500" type="button">😁</Button>
                        </form>
                        <AnimatePresence>
                            {
                                emojiVisible &&
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    className="absolute top-24 right-5 left-20">
                                    <EmojiPicker height='350px' width="100%" onEmojiClick={(save) => {
                                        setMessage((prev) => prev + save.emoji)
                                        setEmojiVisible(false)
                                    }} />
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <Button onClick={() => { setIsChatroomExist(false) }} className='absolute right-0 mt-5 rounded-full p-3 h-fit min-h-fit' color="primary">
                <IoClose size='30px' />
            </Button>
        </>
    )
}

export default ChatCard;