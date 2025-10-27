// src/screens/ProductDeleteScreen.tsx
// Pantalla para confirmar y ejecutar la eliminación de un producto
// Carga los datos del producto y ofrece la acción de eliminar. Tras el borrado
// reinicia la navegación hacia la lista y pasa un mensaje para el Snackbar.
import { useEffect, useState } from "react";
import { View, Alert, Platform, ToastAndroid } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getProduct, deleteProduct } from "../api/products";
import { product } from "../types/product";
import { Card, Text, Button, ActivityIndicator } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDelete">;

export default function ProductDeleteScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    // Obtener el producto a eliminar por ID y guardarlo en el estado local.
    getProduct(id).then(setProduct);
  }, [id]);

  async function handleDelete() {
    // Función que ejecuta la llamada a la API para eliminar el producto.
    // Incluye logs para debugging y manejo de errores.
    console.log("handleDelete pressed, id=", id);
    try {
      console.log("Platform.OS:", Platform.OS);
      try {
        console.log("navigation.canGoBack():", navigation.canGoBack());
      } catch (e) {
        console.log("navigation.canGoBack() error:", e);
      }
      try {
        // Intentamos serializar el estado de navegación para debug (puede fallar).
        console.log("navigation.state:", JSON.stringify(navigation.getState()));
      } catch (e) {
        console.log("navigation.getState() error:", e);
      }
      console.log("typeof navigation.popToTop:", typeof navigation.popToTop);

      // Llamada a la API para eliminar el producto por ID.
      await deleteProduct(id);
      console.log("deleteProduct resolved for id=", id);

      // Feedback: en Android mostramos un Toast nativo; en cualquier caso reiniciamos
      // la pila de navegación hacia la lista y pasamos `message` para el Snackbar.
      try {
        if (Platform.OS === "android") {
          ToastAndroid.show("Producto borrado", ToastAndroid.SHORT);
        }
      } catch (e) {
        // ignorar si falla el Toast
      }

      navigation.reset({ index: 0, routes: [{ name: "Products", params: { message: "Producto borrado" } } as any] });
    } catch (error) {
      // Manejo de error: log y alerta al usuario
      console.error("Error deleting product:", error);
      Alert.alert("Error", "No se pudo eliminar el producto. Intenta de nuevo.");
    }
  }


  if (!product) return <ActivityIndicator animating style={{ flex: 1 }} />;

  return (
    <View style={{ padding: 16 }}>
      <Card>
        <Card.Title title="Confirmar eliminación" />
        <Card.Content>
          <Text>¿Seguro que querés eliminar "{product.title}"?</Text>
        </Card.Content>
        <Card.Actions>
          <Button textColor="red" onPress={handleDelete}>Eliminar</Button>
          <Button onPress={() => navigation.goBack()}>Cancelar</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}


  

