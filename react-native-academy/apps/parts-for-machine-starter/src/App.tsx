import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useLogger } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { RootNavigation } from './screens/ProductsStack';

/** Simple console log of navigation state **/
// const onStateChange = (state: Readonly<NavigationState> | undefined) => {
//   console.log(JSON.stringify(state, null, 2));
// };

export function App() {
  const navigationRef = useNavigationContainerRef();
  useLogger(navigationRef); // Definition of using logger instance
  // Definition of using rn navigation logger (expo plugin)
  // By hitting shift+m in console you can open web plugin with logger
  useReactNavigationDevTools(navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigation />
    </NavigationContainer>
  );
}
