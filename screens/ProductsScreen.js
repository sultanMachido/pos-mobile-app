import React, {useState, useEffect} from 'react';
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
  Button,
  HStack,
  VStack,
  Center,
  Spinner,
  Text
} from 'native-base';
import {getProducts,deleteProduct} from '../api/products';
import ProductList from '../components/ProductList/ProductList';
import SearchBox from '../components/SearchBox/SearchBox';
import { useIsFocused } from '@react-navigation/native';
import ModalBox from '../components/Modal/Modal';

const ProductsScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayModal,setDisplayModal] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState()
  const [deleted,setDeleted] = useState(false)

  const isFocused = useIsFocused();

  useEffect(() => {
      getProductList();
  },[isFocused,deleted]);

  const getProductList = async () => {
    setLoading(true)
    try {
      const data = await getProducts();
      console.log(data,'data')
      if (data?.data?.data?.length) {
        setProducts([...data?.data?.data]);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };

  const goToEditPage=(productId)=>{
    navigation.navigate('EditProduct',{
      productId: productId
    })
  }

  if (loading)
    return (
      <HStack space={8} justifyContent="center" alignItems="center" pt={200}>
        <Spinner color="cyan.500" size="lg"/>
      </HStack>
    );

  const handleOpenModal =(id)=>{
     setDisplayModal(true)
     setSelectedProduct(id)
  }  

  const handleDelete = async()=>{
    try {
      const data = await deleteProduct(selectedProduct)
      if (data.status===200) {
        setDisplayModal(false)
        setDeleted(true)
      }
    } catch (error) {
       
    }
 }  

  return (
    <>
      <ModalBox showModal={displayModal} closeModal={()=>setDisplayModal(false)}>
         <Center>
         <Text pt="10">Do you want to delete this product?</Text> 
         <HStack space={10} mt="2">
          <Button bgColor="red.500"  onPress={()=>handleDelete()}>Yes</Button>
          <Button onPress={()=>setDisplayModal(false)}>No</Button>
         </HStack>
         </Center>       
      </ModalBox>   
      <VStack>
        <Center>
          <Button
            w="80%"
            mt={5}
            mb={2}
            onPress={() => navigation.navigate('CreateProduct')}>
            Create Product
          </Button>
          <SearchBox />
        </Center>
      </VStack>
      <ProductList productList={products} edit={goToEditPage} deleteModal={handleOpenModal}/>
    </>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
