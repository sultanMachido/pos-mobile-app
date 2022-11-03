import React, {useState, useEffect,useContext} from 'react';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {StyleSheet} from 'react-native';
import {
  Flex,
  Heading,
  Button,
  HStack,
  VStack,
  Center,
  ScrollView,
  Text,
  Box
} from 'native-base';
import { getProducts } from '../api/products';
import { Alert } from 'react-native';
import ProductContext from '../providers/ProductContext';

const PosScreen = ({navigation,route}) => {
  const [products, setProducts] = useState([
    {
      name:'Bread',
      quantity: 10,
      price: 2000
    }
  ]);
  const [total, setTotal] = useState(0);
  const [posDisplay, setPosDisplay] = useState({});
  
  const [scannedProduct,dispatch] = useContext(ProductContext)
  const barcode = route?.params?.barcode
  
  // const barcode = 111111
  

  useEffect(() => {
    if(barcode){
      getProductFromBarcode(barcode);
    }
  }, [barcode]);
  
  const getProductFromBarcode = async(barcode)=>{
       
       let queryParam = {
         barcode:barcode
       }
       try {
        let data = await getProducts(id=null,queryParam)
        if (data.status === 200) {
          const action = { type: 'ADD_SCANNED_PRODUCT',payload:[data.data.data]}
           dispatch(action)
           getProductInfo([...scannedProduct.products,...[data.data.data]])
        }
       } catch (error) {
         console.log(error)
       }
  }
  const getProductInfo =(scannedProduct) => {
    let obj ={}
    let total = 0
    scannedProduct.map(val => {
      const {name, price} = val;
      console.log(name);
      if (obj[name]) {
        obj = {
          ...obj,
          [name]: {
            ...obj[name],
            quantity: obj[name].quantity + 1,
          },
        };
        total = total + obj[name].price
      } else {
        obj = {
          ...obj,
          [name]: {
            price: price,
            quantity: 1,
          },
        };
        total = total + obj[name].price
      }
    });

    setPosDisplay({...posDisplay,...obj})
    setTotal(total)
  };

  return (
    <>
      <Flex flexDirection="row" mt={5} mb={5} mx={6}>
        <Button onPress={() => navigation.navigate('Qrcode')}>
          Scan Barcode
        </Button>
      </Flex>

      <Center>
        <HStack space={10}>
          <Heading>Product</Heading>
          <Heading>Quantity</Heading>
          <Heading>Price</Heading>
        </HStack>
      </Center>
      <ScrollView>
      {Object.entries(posDisplay).map((val) => (
            <Flex   direction='row'  alignSelf='center' w="100%">
              <Box  w='20%' ml='12' textAlign='center'>
                <Text >{val[0]}</Text>
              </Box>
              <Box  w='20%' ml='12' textAlign='center'>
                <Text textAlign='center'>x{val[1].quantity}</Text>
              </Box>
              <Box  w='20%' ml='10' textAlign='center'>
                <Text textAlign='center'>{val[1].price}</Text>
              </Box>
            </Flex>
        ))}
      </ScrollView>
      <Text textAlign='center' fontWeight='bold' fontSize="md" >Total:{total}</Text>
      <Center>
        <VStack width="80%">
          <Button mt="10">Submit</Button>
          <Button mt="5" bgColor="#E97876">
            Cancel
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default PosScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
