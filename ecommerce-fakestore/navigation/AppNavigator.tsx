// Configuración de navegación de la aplicación.
// Define las rutas disponibles y los parámetros esperados por pantalla.
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductEditScreen from "../screens/ProductEditScreen";
import ProductDeleteScreen from "../screens/ProductDeleteScreen";
import ProductAddScreen from "../screens/ProductAddScreen";

// Tipado de las rutas y sus parámetros. Esto ayuda a TypeScript a validar
// que pasamos los parámetros correctos entre pantallas.
export type RootStackParamList = {
  Products: undefined; // pantalla principal: no espera params
  ProductDetail: { id: number }; // detalle necesita el id del producto
  ProductAdd: undefined;   // crear producto
  ProductEdit: { id: number }; // editar requiere id
  ProductDelete: { id: number }; // eliminar requiere id
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  // Contenedor principal de navegación que define el stack de pantallas.
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
