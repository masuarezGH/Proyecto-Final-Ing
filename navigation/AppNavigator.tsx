// src/navigation/AppNavigator.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductEditScreen from "../screens/ProductEditScreen";
import ProductDeleteScreen from "../screens/ProductDeleteScreen";
import ProductAddScreen from "../screens/ProductAddScreen";

export type RootStackParamList = {
  Products: undefined;
  ProductDetail: { id: number };
  ProductAdd: undefined;   
  ProductEdit: { id: number };
  ProductDelete: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ProductAdd" component={ProductAddScreen} />
        <Stack.Screen name="ProductEdit" component={ProductEditScreen} />
        <Stack.Screen name="ProductDelete" component={ProductDeleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
