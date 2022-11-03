import React, {useState} from 'react';
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
import { Flex,Heading,Button,Spacer,Modal,FormControl,Input } from 'native-base';

const SalesScreen = ({navigation}) => {
  
 

  return (
    <>
      <Flex flexDirection='row' mt={5} mb={5} mx={6}>
         <Heading>Order List</Heading>
         <Spacer/>
         <Button onPress={()=>navigation.navigate('Pos')}>Open POS</Button>
      </Flex>
      
    </>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
