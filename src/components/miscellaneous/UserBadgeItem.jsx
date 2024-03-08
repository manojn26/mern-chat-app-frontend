import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ users, handleFunction }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius='lg'
      margin={1}
      marginBottom={2}
      variant='solid'
      fontSize={12}
      colorScheme='purple'
      cursor='pointer'
      onClick={handleFunction}
    >
      {users.name}
      {/* {admin === users._id && <span> (Admin)</span>} */}
      <CloseIcon paddingLeft={1} />
    </Badge>
  );
};

export default UserBadgeItem;
