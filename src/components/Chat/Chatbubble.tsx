import axios from "axios";
import { motion } from "framer-motion";
import React from "react";

import { Button, ChatBubble, Dropdown } from "react-daisyui";
import { BiChevronDown } from "react-icons/bi";
import { Socket } from "socket.io-client";
import { formatDate } from "../../utils/dateFormatter";

const Chatbubble = ({ item, partner, socket, setMessages }: {
    item: {
        id: number,
        sent_by_partner: boolean,
        text_message: string,
        created_at: Date
    },
    partner: {
        image_url: string
    },
    socket: Socket,
    setMessages: Function
}) => {

    let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

    const handleDeleteMessage = () => {
        console.log(`item with id: ${item.id} deleted`);
        console.log(item);


        axios.delete(`http://localhost:3333/api/pengajuan/message/delete`, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            },
            data: {
                id: item.id
            }
        })
            .then((result) => {
                console.log(result)
            }).catch((err) => {
                console.error(err)
            });
    }

    React.useEffect(() => {
        socket.on(`msg:delete:${item.id}`, (data: { id: number }) => {
            console.log(`message id : ${item.id} deleted`);

            setMessages((prev: { id: number }[]) => prev.filter((mapper: { id: number }) => {
                return mapper.id !== data.id
            }))
        })
    }, [socket, item.id, setMessages])


    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='my-2'
        >
            <ChatBubble className="relative" end={item.sent_by_partner ? false : true}>
                <ChatBubble.Avatar src={item.sent_by_partner ? partner.image_url : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'} />
                <ChatBubble.Message color="primary" className={item.sent_by_partner ? 'pr-10' : 'pl-10'}>
                    {
                        item.sent_by_partner ?
                            ''
                            :
                            <Dropdown className={`absolute ${item.sent_by_partner ? 'right-2' : 'left-2'} top-2 z-50`}>
                                <Button shape="circle" className="text-white" color="ghost" size="xs">
                                    <BiChevronDown size={20} />
                                </Button>
                                <Dropdown.Menu>
                                    <Dropdown.Item className="text-black" onClick={handleDeleteMessage}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    }
                    {item.text_message}
                </ChatBubble.Message>
                <ChatBubble.Footer>
                    <ChatBubble.Time className="text-gray-900 opacity-70">{formatDate(item.created_at)}</ChatBubble.Time>
                </ChatBubble.Footer>
            </ChatBubble>
        </motion.div>
    );
}

export default Chatbubble;