import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'

const HomePage = () => {
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