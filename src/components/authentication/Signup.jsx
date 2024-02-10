import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../../API_CALL/api-url'


const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [picture, setPicture] = useState()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const toast = useToast()

    function handleClick() {
        setShow(!show)
    }

    function postPicture(pic) {
        setLoading(true)

        if (pic === undefined) {
            toast({
                title: "Please Select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            return
        }

        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData()
            data.append("file", pic);
            data.append("upload_preset", "mern-normal-chat-app")
            data.append("cloud_name", "dqsc8ijyf")
            fetch("https://api.cloudinary.com/v1_1/dqsc8ijyf/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json()).then((data) => {
                // console.log(data);
                setPicture(data.url.toString());
                console.log(data.url.toString());
                setLoading(false)
            }).catch((err) => {
                console.log(err);
                setLoading(false)
            })
        } else {
            toast({
                title: "Please Select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
        }
    }
    const submitHandler = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
            toast({
                title: "Password's Doe's not matches",
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
            const { data } = axios.post(API_URL + "/api/user", { name, email, password, picture }, config)
            toast({
                title: "Registration Succesfull",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
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
        <>
            <VStack spacing="5px">
                <FormControl id='full-name' isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
                </FormControl>
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

                <FormControl id='confirm-password' isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input type={show ? "text" : "password"} placeholder='Enter Your Password' onChange={(e) => setConfirmPassword(e.target.value)} />
                        <InputRightElement>
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl id='pic'>
                    <FormLabel>Upload Your Picture</FormLabel>
                    <Input type='file' p={1.5} accept='image/*' onChange={(e) => postPicture(e.target.files[0])} />
                </FormControl>

                <Button
                    colorScheme='blue'
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    variant="solid"
                    isLoading={loading}
                >
                    Sign Up
                </Button>
            </VStack>
        </>
    )
}

export default Signup