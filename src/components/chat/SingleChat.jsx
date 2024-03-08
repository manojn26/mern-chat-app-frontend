import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModel from "../miscellaneous/ProfileModel"
import { getSender, getSenderFull } from "../../config/ChatLogics";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModel";


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();


  console.log(selectedChat);

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
                  <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                </>
              )
            }
          </Text>

          <Box
            display="flex"
            justifyContent="flex-end"
            padding={3}
            background="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflow="hidden"
          >

          </Box>

          {/* Messages Here */}
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
