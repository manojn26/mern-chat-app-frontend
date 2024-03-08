import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ users, handleFunction }) => {
  return (
    <>
      <Box
        onClick={handleFunction}
        cursor='pointer'
        background='#E8E8E8'
        _hover={{
          background: "#38B2AC",
          color: "white",
        }}
        width='100%'
        display='flex'
        alignItems='center'
        color='black'
        px={3}
        py={2}
        marginBottom={2}
        borderRadius='lg'
      >
        <Avatar
          marginRight={2}
          size='sm'
          cursor='pointer'
          name={users.name}
          src={users.pic}
        />
        <Box>
          <Text>{users.name}</Text>
          <Text fontSize='xs'>
            <b>Email : </b>
            {users.email}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default UserListItem;
