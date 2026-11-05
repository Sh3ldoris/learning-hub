import { createContext, PropsWithChildren, useMemo, useState } from 'react';

export const LoginContextProvider = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const LoginContext = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contextValue = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);
  return (
    <LoginContextProvider.Provider value={contextValue}>{children}</LoginContextProvider.Provider>
  );
};

export default LoginContext;
