import React,{useEffect,useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
  getCameraPermissionStatus
} from 'react-native-vision-camera';
import * as REA from 'react-native-reanimated';
import { CameraScreen } from 'react-native-camera-kit';
import { Alert } from 'react-native';

const QrcodeScreen = ({navigation}) => {
  
 const getPermission =async()=>{
    const cameraPermission = await Camera.getCameraPermissionStatus()
    console.log(cameraPermission)
 }  
 
 const requestPermission =async()=>{
    const newCameraPermission = await Camera.requestCameraPermission()
 }

 useEffect(()=>{
    getPermission()
 },[])

 useEffect(()=>{
    requestPermission()
 },[])
 
const onBottomButtonPressed=(event)=>{
   console.log(event,'event')
   navigation.navigate('Pos')
}
  
 const devices = useCameraDevices()
 const device = devices.back

 if (device == null) return <Text>loading</Text>
 return (
  <CameraScreen
  actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
  onBottomButtonPressed={(event) => onBottomButtonPressed(event)}
  hideControls={false} // (default false) optional, hides camera controls
  showCapturedImageCount={false} // (default false) optional, show count for photos taken during that capture session
  scanBarcode={true}
  onReadCode={(event) => navigation.navigate('Pos',{
   barcode:event.nativeEvent.codeStringValue
})} // optional
  showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
  laserColor='red' // (default red) optional, color of laser in scanner frame
  frameColor='white' // (default white) optional, color of border of scanner frame
/>
 )
};
const styles = StyleSheet.create({
  rnholeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default QrcodeScreen;
