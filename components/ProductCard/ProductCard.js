import React from 'react'
import {Box, Text, HStack, Flex, Center, Image,VStack,ZStack} from 'native-base';

const ProductCard =({productInfo,goToEditPage,productId,showDeleteModal})=>{
  return(
//    <Center w="100%" bgColor="cyan.500">
      <Box  h={150} my={7}   position="relative" borderRadius="md" mb={10}>
         <HStack w="100%">
          <Box w="30%">
             <Image source={{uri:productInfo?.item?.image}} alt='product image' height='lg' width={200} size="xl"/>
             <ZStack>
                 <Text>{productInfo?.item?.status}</Text>
             </ZStack>
          </Box>   
          <Box pl={5} w="60%">
            <Text fontSize="lg">
                {productInfo?.item?.name}
            </Text>
            <Text fontSize="lg">
                {productInfo?.item?.description}
            </Text>
            <Text fontSize="md" fontWeight="bold">
                {'\u0024'+productInfo?.item?.price}
            </Text>
            <Text fontSize="md">
                {productInfo?.item?.quantity}
            </Text>
            <HStack space={5}>
                <Text color="blue.500" onPress={()=>goToEditPage(productId)}>Edit</Text>
                <Text color="red.500" onPress={()=>showDeleteModal(productId)}>Delete</Text>
            </HStack>
          </Box>
        </HStack> 
      </Box>
    // </Center>
  )
}

export default ProductCard