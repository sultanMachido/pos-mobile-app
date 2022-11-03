import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  FormControl,
  Input,
  Button,
  ScrollView,
  Center,
  TextArea,
  Pressable,
  Icon,
  IconButton,
  Modal,
  Text,
  Progress,
} from 'native-base';
import {editProduct, getProducts} from '../api/products';
import {uploadImage} from '../api/upload';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getFormData} from '../utils/getFormData';


const EditProductScreen = ({navigation, route}) => {
  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading,setLoading] = useState(false)

  const {productId} = route.params;
  let progress

  useEffect(() => {
    getProduct();
  }, [productId]);

 

  const handleAddProductInfo = (text, info) => {
    const newInfo = {};
    newInfo[info] = text;
    setProduct({
      ...product,
      ...newInfo,
    });
  };
  const getProduct = async () => {
    try {
      const data = await getProducts(productId);
      setProduct({
        ...data.data.data,
      });
    } catch (error) {}
  };
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const data = await editProduct(product,productId);

      if (data.status === 200) {
        setLoading(false)
        navigation.navigate('Products');
      }
    } catch (error) {}
  };

  const getPictureFromGallery = async () => {
    try {
      const result = await launchImageLibrary();
      const imageAsFormData = getFormData(result);
      if (result.assets[0].uri) {
        setUploadStatus(true);
        setShowModal(false);
        const data = await uploadImage(imageAsFormData);
        // console.log(data,'data')
        if (data.data.secure_url) {
          // console.log('here')
          clearInterval(progress)
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
    <Center>
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
      <ScrollView width="90%">
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            onChangeText={text => handleAddProductInfo(text, 'name')}
            value={product?.name}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            onChangeText={text => handleAddProductInfo(text, 'description')}
            value={product?.description}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Image</FormControl.Label>
          <Input
            // onChangeText={text => handleAddProductInfo(text, 'image')}
            _disabled={true}
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
          {uploadStatus ? <>
          <Text>Uploading...</Text>
          </>: null}
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Barcode</FormControl.Label>
          <Input
            onChangeText={text => handleAddProductInfo(text, 'barcode')}
            value={product?.barcode}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Price</FormControl.Label>
          <Input
            onChangeText={text => handleAddProductInfo(text, 'price')}
            value={product?.price?.toString()}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Quantity</FormControl.Label>
          <Input
            onChangeText={text => handleAddProductInfo(text, 'quantity')}
            value={product?.quantity?.toString()}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Sales Price</FormControl.Label>
          <Input
            onChangeText={text => handleAddProductInfo(text, 'salesPrice')}
            value={product?.salesPrice?.toString()}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Status</FormControl.Label>
          <Input
            onChangeText={text => handleAddProductInfo(text, 'status')}
            value={product?.status}
          />
        </FormControl>
        <Button my={5}  isLoading={loading} isLoadingText="Editing Product"  onPress={() => handleSubmit()}>
          Edit
        </Button>
      </ScrollView>
    </Center>
  );
};

export default EditProductScreen;
