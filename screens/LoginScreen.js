import React,{useEffect,useState} from 'react';
import {Box,Center,Heading,VStack,FormControl,Link,Button,HStack,Text,Input} from 'native-base'
import {Camera} from 'react-native-vision-camera';
import { logUserIn } from '../api/users';

const LoginScreen = ({navigation}) => {
  const [loading,setLoading] = useState(false)
  const [loginDetails,setLoginDetails] = useState({
    email:'',
    password:''
  })

  const checkCameraPermission = async () => {
    let status = await Camera.getCameraPermissionStatus();
    if (status !== 'authorized') {
      await Camera.requestCameraPermission();
      status = await Camera.getCameraPermissionStatus();
      if (status === 'denied') {
        showToast(
          'You will not be able to scan if you do not allow camera access',
        );
      }
    }
  };

  const handleAddLoginInfo = (text,info) => {
    const newInfo = {}
    newInfo[info] = text
    setLoginDetails({
      ...loginDetails,
      ...newInfo
    })
  }
  
  const handleLogIn = async()=>{
    setLoading(true)
    try {
      const data = await logUserIn(loginDetails)
      setLoading(false)
      navigation.navigate('MainLayout')
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(()=>{
    checkCameraPermission()
  },[])
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input type='email' onChangeText={text=>handleAddLoginInfo(text,'email')}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={text=>handleAddLoginInfo(text,'password')} />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" isLoading={loading} isLoadingText="Logging in" onPress={()=>handleLogIn()}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={()=>navigation.navigate('Register')}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;
