import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabParamList, ProductStackParamList } from '../types/NavigationParamList';
import FavoriteProductListScreen from './FavoriteProductListScreen';
import ProductDetailScreen from './ProductDetailScreen';
import ProductListScreen from './ProductListScreen';

const Stack = createNativeStackNavigator<ProductStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export const RootNavigation = () => {
  return (
    <BottomTab.Navigator initialRouteName="FavoriteProductList">
      <BottomTab.Screen
        name="ProductsStack"
        component={ProductsStack}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen name="FavoriteProductList" component={FavoriteProductListScreen} />
    </BottomTab.Navigator>
  );
};
