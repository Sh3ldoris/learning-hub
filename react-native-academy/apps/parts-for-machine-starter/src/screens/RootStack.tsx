import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationParamList } from '../types/NavigationParamList';
import ProductDetailScreen from './ProductDetailScreen';
import ProductListScreen from './ProductListScreen';

const Stack = createNativeStackNavigator<NavigationParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
