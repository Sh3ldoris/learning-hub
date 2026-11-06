import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useLogger } from '@react-navigation/devtools';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import LoginContext from './context/LoginContext';
import { RootNavigation } from './screens/RootNavigation';

/** Simple console log of navigation state **/
// const onStateChange = (state: Readonly<NavigationState> | undefined) => {
//   console.log(JSON.stringify(state, null, 2));
// };

/**
 * Deep linking listener set-up
 * from terminal call `xcrun simctl openurl booted "exp://{ip-address}:8081/--/UserDetail"` where ip-address is ip that shows the react when running
 */
const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      BottomNavigation: {
        screens: {
          ProductsStack: {
            initialRouteName: 'ProductList',
            screens: {
              ProductList: 'product-list',
              ProductDetail: 'product-detail/:productId',
            },
          },
          FavoriteProductList: 'favorites',
        },
      },
      UserDetail: 'user',
    },
  },
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(91, 196, 191)',
    primary: 'rgb(193, 66, 67)',
  },
};

export function App() {
  const navigationRef = useNavigationContainerRef();
  useLogger(navigationRef); // Definition of using logger instance
  // Definition of using rn navigation logger (expo plugin)
  // By hitting shift+m in console you can open web plugin with logger
  useReactNavigationDevTools(navigationRef);

  return (
    <NavigationContainer theme={MyTheme} linking={linking} ref={navigationRef}>
      <LoginContext>
        <RootNavigation />
      </LoginContext>
    </NavigationContainer>
  );
}
