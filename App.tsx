import React from "react";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";
import AppNavigator from "./navigation/AppNavigator";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1976d2",   // azul
    secondary: "#ff9800", // naranja
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
