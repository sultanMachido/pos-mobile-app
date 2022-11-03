import 'react-native-gesture-handler';
import React,{useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProductsScreen from './screens/ProductsScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import PosScreen from './screens/PosScreen';
import QrcodeScreen from './screens/QrcodeScreen';
import SalesScreen from './screens/SalesScreen';
import CustomersScreen from './screens/CustomersScreen';
import EditProductScreen from './screens/EditProductScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import ProductContext from './providers/ProductContext';


const initialState = {
  products:[]
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_SCANNED_PRODUCT':
      return {...state, 
        products: [
         ...state.products,
         ...action.payload
      ]} 
    default:
      return state
  }
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainLayout=()=> {
  return (
    <Drawer.Navigator initialRouteName='Dashboard'>
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Products" component={ProductsScreen} />
        <Drawer.Screen name="Pos" component={PosScreen} />
        <Drawer.Screen name="Sales" component={SalesScreen} />
        <Drawer.Screen name="Customers" component={CustomersScreen} />
    </Drawer.Navigator> 
  );
}
const App = () => {  
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state) 
  return (
   <ProductContext.Provider value={[state, dispatch]}>
    <PaperProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MainLayout" component={MainLayout} />
          <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
          <Stack.Screen name="Qrcode" component={QrcodeScreen} />
          <Stack.Screen name="EditProduct" component={EditProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </PaperProvider>
    </ProductContext.Provider> 
  );
};

export default App;
