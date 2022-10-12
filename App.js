import React from "react";
import StackNavigator from './StackNavigator';
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/Auth";

export default function App() {
  return (
    
    <AuthProvider>
      {/* HOC - Higher Order Component */}
      <NavigationContainer>
      <StackNavigator />  
    </NavigationContainer>
    {/* Passes down the cool auth stuff to children */}
  </AuthProvider>
  );
};