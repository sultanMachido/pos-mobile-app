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

const CustomersScreen = ({navigation}) => {
  const [table, setTable] = useState({
    tableHead: ['Product Name', 'Quantity', 'Price'],
    tableData: [
      ['1', '2', '3'],
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['a', 'b', 'c'],
    ],
  });
 

  return (
    <>
      <Flex flexDirection='row' mt={5} mb={5} mx={6}>
         <Heading>Customer List</Heading>
         <Spacer/>
         <Button onPress={()=>navigation.navigate('Pos')}>Add Customer</Button>
      </Flex>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row
          data={table.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows data={table.tableData} textStyle={styles.text} />
      </Table>
    </>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
