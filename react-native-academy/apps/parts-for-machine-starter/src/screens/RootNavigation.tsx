import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BottomTabParamList,
  DrawerParamList,
  ProductStackParamList,
} from '../types/NavigationParamList';
import FavoriteProductListScreen from './FavoriteProductListScreen';
import ProductDetailScreen from './ProductDetailScreen';
import ProductListScreen from './ProductListScreen';
import UserDetailScreen from './UserDetailScreen';

const Stack = createNativeStackNavigator<ProductStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

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
      <BottomTab.Screen name="FavoriteProductList" component={FavoriteProductListScreen} />
    </BottomTab.Navigator>
  );
};

export const RootNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="UserDetail" component={UserDetailScreen} />
    </Drawer.Navigator>
  );
};
