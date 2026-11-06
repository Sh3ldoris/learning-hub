import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { GetProductListOptions } from '../mock-data/data';

export type ProductStackParamList = {
  ProductList: GetProductListOptions | undefined;
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
    DrawerNavigationScreenProps<'BottomNavigation'>
  >;

export type DrawerParamList = {
  BottomNavigation: NavigatorScreenParams<BottomTabParamList>;
  UserDetail: undefined;
  Login: undefined;
};

export type RootStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList>;
  ProductFilter: {
    currentFilter?: GetProductListOptions;
    // route.key zdrojovej obrazovky, ktorá otvorí filter
    sourceScreenKey: string;
    // navigation.getState().key navigátora, ktorý vlastní zdrojovú obrazovku
    sourceNavigatorKey: string;
  };
};

export type DrawerNavigationScreenProps<T extends keyof DrawerParamList> = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, T>,
  RootStackScreenProps<'Drawer'>
>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
