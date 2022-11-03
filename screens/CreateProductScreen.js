import React, {useState, useEffect} from 'react';
import {
  FormControl,
  Input,
  Button,
  ScrollView,
  Center,
  TextArea,
  Modal,
  Pressable,
  Text,
  IconButton
} from 'native-base';
import {addProduct} from '../api/products';
import {uploadImage} from '../api/upload';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import {TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getFormData} from '../utils/getFormData';

const CreateProductScreen = ({navigation}) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    quantity: 0,
    salesPrice: 0,
    status: '',
    barcode: '',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);

  const handleAddProductInfo = (text, info) => {
    const newInfo = {};
    newInfo[info] = text;
    setProduct({
      ...product,
      ...newInfo,
    });
  };

  const handleSumbit = async () => {
    setLoading(true);
    try {
      const data = await addProduct(product);
      if (data.status === 200) {
        navigation.navigate('Products');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPictureFromGallery = async () => {
    try {
      const result = await launchImageLibrary();
      const imageAsFormData = getFormData(result);
      console.log(result.assets[0].uri,'image')
      if (result.assets[0].uri) {
        setUploadStatus(true);
        setShowModal(false);
        const data = await uploadImage(imageAsFormData);
        // console.log(data,'data')
        if (data.data.secure_url) {
          // console.log('here')
          setProduct({
            ...product,
            image: data.data.secure_url,
          });
          setUploadStatus(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPictureFromCamera = async () => {
    try {
      const result = await launchCamera({
        saveToPhotos: true,
      });
      const imageAsFormData = getFormData(result);
      if (result.assets[0].uri) {
        setUploadStatus(true);
        setShowModal(false);
        const data = await uploadImage(imageAsFormData);
        if (data.data.secure_url) {
          setProduct({
            ...product,
            image: data.data.secure_url,
          });
          setUploadStatus(false);
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content h={100}>
          <Modal.CloseButton />
          <Modal.Body>
            <TouchableOpacity onPress={() => getPictureFromCamera()}>
              <Text pb={5}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getPictureFromGallery()}>
              <Text>Select from Gallery</Text>
            </TouchableOpacity>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Center>
        <ScrollView width="90%">
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input onChangeText={text => handleAddProductInfo(text, 'name')} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Description</FormControl.Label>
            <TextArea
              onChangeText={text => handleAddProductInfo(text, 'description')}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Image</FormControl.Label>
            <Input
              onChangeText={text => handleAddProductInfo(text, 'image')}
              InputRightElement={
                <Pressable>
                  <IconButton
                    icon={
                      <FontAwesome
                        // style={styles.iconStyle}
                        icon={SolidIcons.camera}
                        size={50}
                        onPress={() => setShowModal(true)}
                      />
                    }
                    size={50}
                    mr="2"
                    color="cyan.400"
                  />
                </Pressable>
              }
              value={product?.image}
            />
            {uploadStatus ? (
              <>
                <Text>Uploading...</Text>
              </>
            ) : null}
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Barcode</FormControl.Label>
            <Input
              onChangeText={text => handleAddProductInfo(text, 'barcode')}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Price</FormControl.Label>
            <Input onChangeText={text => handleAddProductInfo(text, 'price')} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Quantity</FormControl.Label>
            <Input
              onChangeText={text => handleAddProductInfo(text, 'quantity')}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Sales Price</FormControl.Label>
            <Input
              onChangeText={text => handleAddProductInfo(text, 'salesPrice')}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Status</FormControl.Label>
            <Input
              onChangeText={text => handleAddProductInfo(text, 'status')}
            />
          </FormControl>
          <Button
            my={5}
            isLoading={loading}
            isLoadingText="Creating Product"
            onPress={() => handleSumbit()}>
            Create
          </Button>
        </ScrollView>
      </Center>
    </>
  );
};

export default CreateProductScreen;
