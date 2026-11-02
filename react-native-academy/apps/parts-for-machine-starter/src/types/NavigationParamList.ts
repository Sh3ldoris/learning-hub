import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
};

export type ProductStackScreenProps<T extends keyof ProductStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ProductStackParamList, T>,
  RootNavigationScreenProps<'ProductsStack'>
>;

export type BottomTabParamList = {
  ProductsStack: NavigatorScreenParams<ProductStackParamList>;
  FavoriteProductList: undefined;
};

export type RootNavigationScreenProps<T extends keyof BottomTabParamList> = BottomTabScreenProps<
  BottomTabParamList,
  T
>;
