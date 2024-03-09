import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Button, FormControl, IconButton, Input, InputGroup, InputRightElement, Spinner, Text, useToast } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import ProfileModel from "../miscellaneous/ProfileModel"
import { getSender, getSenderFull } from "../../config/ChatLogics";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModel";
import axios from "axios";
import { API_URL } from "../../API_CALL/api-url";
import "./SingleChat.css"
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
// import animationData from "../../Animations/Typing.json"



const ENDPOINT = API_URL



var socket, selectedChatCompare;

// socket = io(ENDPOINT);


const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState()
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }

  // }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user)
    socket.on("connected", () => setSocketConnected(true))
    socket.on("typing", () => setIsTyping(true))
    socket.on("stop typing", () => setIsTyping(false))
  }, [])



  const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

  const toast = useToast()


  console.log(selectedChat);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      setLoading(true)

      const { data } = await axios.get(`${API_URL}/api/message/${selectedChat._id}`, config)

      setMessages(data)
      setLoading(false)

      socket.emit("join chat", selectedChat._id)
      console.log("All Messages", messages);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to send the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
    }
  }

  useEffect(() => {
    fetchMessages()

    selectedChatCompare = selectedChat;


  }, [selectedChat])



  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        // give notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification])
          setFetchAgain(!fetchAgain)
        }
      } else {
        setMessages([...messages, newMessageRecieved])
      }
    })
  })


  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id)
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`
          }
        }

        const { data } = await axios.post(`${API_URL}/api/message`, {
          content: newMessage,
          chatId: selectedChat._id
        }, config)

        console.log(data);

        setNewMessage("")

        socket.emit("new message", data)
        setMessages([...messages, data])

      } catch (error) {
        toast({
          title: "Error Occured",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
      }
    }
  }



  const sendMessageButton = async () => {
    socket.emit("stop typing", selectedChat._id)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.post(`${API_URL}/api/message`, {
        content: newMessage,
        chatId: selectedChat._id
      }, config)

      console.log(data);

      setNewMessage("")
      socket.emit("new message", data)
      setMessages([...messages, data])

    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to send the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
    }


  }



  const typingHandler = (event) => {
    setNewMessage(event.target.value)
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true)
      socket.emit("typing", selectedChat._id)
    }

    let lastTypingTime = new Date().getTime()
    let timeLength = 3000

    setTimeout(() => {
      let timeNow = new Date().getTime()
      let timerDiff = timeNow - lastTypingTime

      if (timerDiff >= timeLength && typing) {
        socket.emit("stop typing", selectedChat._id)
        setTyping(false)
      }
    }, timeLength)

  }

  return (
    <>
      {selectedChat ? (
        <>
          <Text fontSize={{ base: "28px", md: "30px" }}
            paddingBottom={3}
            px={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"

          >
            <IconButton display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {
              !selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModel
                    user={getSenderFull(user, selectedChat.users)}
                  />

                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
                </>
              )
            }
          </Text>

          <Box
            display="flex"
            justifyContent="flex-end"
            flexDir="column"
            padding={3}
            background="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflowY="hidden"
          >



            {/* Messages Here */}

            {
              loading ? (
                <Spinner
                  size="xl"
                  width={20}
                  height={20}
                  alignSelf="center"
                  m="auto"
                />
              ) : (
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              )
            }
            <FormControl onKeyDown={sendMessage} isRequired marginTop={3}>
              {isTyping ? <div>Typing...</div> : <></>}
              <InputGroup>

                <Input
                  variant="filled"
                  background="#E0E0E0"
                  placeholder="Enter a message....."
                  onChange={typingHandler}
                  value={newMessage} />

                <InputRightElement className="message-sending-button-container">
                  {/* <ArrowRightIcon className="message-sending-button" />
                   */}
                  <Button onClick={sendMessageButton} rightIcon={<ArrowForwardIcon />} colorScheme='whatsapp'></Button>
                </InputRightElement>


              </InputGroup>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          h='100%'
        >
          <Text fontSize='3xl' paddingBottom={3} fontFamily='Work sans'>
            Click on a user to start chating
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
