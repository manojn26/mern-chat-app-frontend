import React, { useEffect, useState } from 'react'
import { GET_URL } from '../API-CALL'

const Chat = () => {
    const [chats, setChats] = useState([])

    const fetchData = async () => {
        const { data } = await GET_URL;
        console.log(data);
        setChats(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {chats.map((ch) => (
                <div key={ch._id}>{ch.chatName}</div>
            ))}
        </>
    )
}

export default Chat