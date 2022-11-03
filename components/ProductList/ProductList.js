import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import {FlatList, ScrollView, Center} from 'native-base';

const ProductList = ({productList, edit,deleteModal}) => {
  return (
    <Center w="100%" ml="5">
      <FlatList
        data={productList}
        renderItem={product => (
          <ProductCard
            productInfo={product}
            goToEditPage={edit}
            productId={product.item.productId}
            showDeleteModal={deleteModal}
          />
        )}
      />
    </Center>
  );
};

export default ProductList;
