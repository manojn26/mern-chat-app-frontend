import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate();

    // const locations = window.location;


    useEffect(() => {

        let userInfo
        if (!localStorage.getItem("userInfo")) {
            console.log("No Items");
            console.log(localStorage.getItem("userInfo"));
            return
        }

        userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(userInfo);




        if (userInfo) {
            navigate("/chat")

        }

    }, [navigate]);

    return (
        <>
            <Container maxWidth="xl" centerContent>
                <Box display="flex"
                    p={3}
                    justifyContent="center"
                    bg={"white"}
                    w="100%"
                    m="40px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                >
                    <Text fontSize="4xl" fontFamily="Work sans" color="black">Mano-Chat-Live</Text>
                </Box>

                <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="black">
                    <Tabs variant='soft-rounded' colorScheme='blue'>
                        <TabList mb="1em">
                            <Tab width="50%">Login</Tab>
                            <Tab width="50%">Signup</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <Signup />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </>
    )
}

export default HomePage