import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { LoginContextProvider } from '../context/LoginContext';
import {
  BottomTabParamList,
  DrawerParamList,
  ProductStackParamList,
  RootStackParamList,
} from '../types/NavigationParamList';
import FavoriteProductListScreen from './FavoriteProductListScreen';
import LoginScreen from './LoginScreen';
import ProductDetailScreen from './ProductDetailScreen';
import ProductFilterScreen from './ProductFilterScreen';
import ProductListScreen from './ProductListScreen';
import UserDetailScreen from './UserDetailScreen';

const Stack = createNativeStackNavigator<ProductStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export const BottomNavigation = () => {
  return (
    <BottomTab.Navigator initialRouteName="ProductsStack">
      <BottomTab.Screen
        name="ProductsStack"
        component={ProductsStack}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="FavoriteProductList"
        options={{ headerShown: false }}
        component={FavoriteProductListScreen}
      />
    </BottomTab.Navigator>
  );
};

export const DrawerNavigation = () => {
  const { isLoggedIn } = useContext(LoginContextProvider);
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      {isLoggedIn ? (
        <Drawer.Screen name="UserDetail" component={UserDetailScreen} />
      ) : (
        <Drawer.Screen name="Login" component={LoginScreen} />
      )}
    </Drawer.Navigator>
  );
};

export const RootNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Drawer"
        component={DrawerNavigation}
      />
      <RootStack.Screen
        options={{ presentation: 'card' }}
        name="ProductFilter"
        component={ProductFilterScreen}
      />
    </RootStack.Navigator>
  );
};
