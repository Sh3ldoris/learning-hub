import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import DrawerMenuButton from '../components/DrawerMenuButton';
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
    <Stack.Navigator screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen
        name="ProductList"
        options={{
          title: 'Produkty',
          headerLeft: () => <DrawerMenuButton />,
        }}
        component={ProductListScreen}
      />
      <Stack.Screen name="ProductDetail" options={{ title: '' }} component={ProductDetailScreen} />
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
        <Drawer.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{ headerLeft: () => <DrawerMenuButton /> }}
        />
      ) : (
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerLeft: () => <DrawerMenuButton /> }}
        />
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
