import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
};

export type ProductStackScreenProps<T extends keyof ProductStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ProductStackParamList, T>,
  BottomTabNavigationScreenProps<'ProductsStack'>
>;

export type BottomTabParamList = {
  ProductsStack: NavigatorScreenParams<ProductStackParamList>;
  FavoriteProductList: undefined;
};

export type BottomTabNavigationScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    RootNavigationScreenProps<'BottomNavigation'>
  >;

export type DrawerParamList = {
  BottomNavigation: NavigatorScreenParams<BottomTabParamList>;
  UserDetail: undefined;
  Login: undefined;
};

export type RootNavigationScreenProps<T extends keyof DrawerParamList> = DrawerScreenProps<
  DrawerParamList,
  T
>;
