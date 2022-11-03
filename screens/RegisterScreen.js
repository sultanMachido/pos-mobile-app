import React,{useState} from 'react'
import {Box,Center,Heading,VStack,FormControl,Link,Button,HStack,Text,Input} from 'native-base'
import { createUser } from '../api/users'

const RegisterScreen =({navigation})=>{
    const [userInfo,setUserInfo] = useState({
       firstname:'',
       lastname:'',
       email:'',
       password:''
    })
    const [loading,setLoading] = useState(false)
    
    const handleAddUserInfo = (text,info) => {
      const newInfo = {}
      newInfo[info] = text
      setUserInfo({
        ...userInfo,
        ...newInfo
      })
    }

    const handleSubmit = async()=>{
      setLoading(true)
      try {
        const createdUser = await createUser(userInfo)
        console.log(createdUser,'user')
        setLoading(false)
        navigation.navigate('Login')
      } catch (error) {
        console.log(error,'error')
        setLoading(false)
      }
    }
    return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Firstname</FormControl.Label>
            <Input onChangeText={text=>handleAddUserInfo(text,'firstname')}/>
          </FormControl>   
          <FormControl>
            <FormControl.Label>Lastname</FormControl.Label>
            <Input onChangeText={text=>handleAddUserInfo(text,'lastname')}/>
          </FormControl>  
          <FormControl>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input type="email" onChangeText={text=>handleAddUserInfo(text,'email')}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={text=>handleAddUserInfo(text,'password')}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="indigo" isLoading={loading} isLoadingText="Submitting" onPress={()=>handleSubmit()}>
            Sign up
          </Button>
          <Text onPress={()=>navigation.navigate('Login')}>Go Back</Text>
        </VStack>
      </Box>
    </Center>
    )
}

export default RegisterScreen