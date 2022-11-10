import React from "react";
import StackNavigator from './StackNavigator';
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { navigationRef } from "./RootNavigation";
import {TailwindProvider, useTailwind} from 'tailwind-rn';
import utilities from './tailwind.json';


const App = () =>  {
  const tailwind = useTailwind();

  return (
    <NavigationContainer ref={navigationRef}>
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  </NavigationContainer>
  );
};

const Root = () => (
	<TailwindProvider utilities={utilities}>
		<App />
	</TailwindProvider>
);

export default Root;