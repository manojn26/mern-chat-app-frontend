import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../API_CALL/api-url'

const Login = () => {
    const [email, setEmail] = useState()
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const navigate = useNavigate()

    function handleClick() {
        setShow(!show)
    }

    const submitHandler = async () => {
        setLoading(true)

        if (!email || !password) {
            toast({
                title: "Please Fill All Details",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            return
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",

                },
            }

            const { data } = await axios.post(API_URL + "/api/user/login", { email, password }, config)
            toast({
                title: "Login Succesfull",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
            navigate("/chat")


        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
        }

    }

    return (
        <VStack>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement>
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                variant="solid"
                isLoading={loading}
            >
                Login
            </Button>

            {/* <Button
                colorScheme='red'
                width="100%"
                style={{ marginTop: 15 }}
                variant="solid"

            >
                Guest User Credentials
            </Button> */}
        </VStack>
    )
}

export default Login