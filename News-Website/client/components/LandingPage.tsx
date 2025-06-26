import { Button, Center, Group, HStack, Icon } from "@chakra-ui/react";
import { FaHome, FaPager } from "react-icons/fa";
import React from "react";
const Landingpage = () => {
  return (
    <>
      <HStack
        display={"flex"}
        backgroundColor={"whiteAlpha.950"}
        justifyContent={"space-between"}
        w={"full"}
        h={"fit"}
        paddingY={"2"}
      >
        <Icon>
          <FaPager color={"black"} />
        </Icon>
        <Group>
          <Button>SignIn</Button>
          <Button>SignUp</Button>
        </Group>
      </HStack>
      <div className="text-[#633e27] w-full h-screen grid">
        <Center gap={"5"}>
          <FaHome /> Landding Page Is Here !
        </Center>
      </div>
    </>
  );
};

export default Landingpage;
