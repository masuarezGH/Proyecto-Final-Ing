// src/screens/ProductDeleteScreen.tsx
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
    getProduct(id).then(setProduct);
  }, [id]);

  async function handleDelete() {
    console.log("handleDelete pressed, id=", id);
    try {
      console.log("Platform.OS:", Platform.OS);
      try {
        console.log("navigation.canGoBack():", navigation.canGoBack());
      } catch (e) {
        console.log("navigation.canGoBack() error:", e);
      }
      try {
        // navigation.getState may contain functions, but usually serializable for debug
        console.log("navigation.state:", JSON.stringify(navigation.getState()));
      } catch (e) {
        console.log("navigation.getState() error:", e);
      }
      console.log("typeof navigation.popToTop:", typeof navigation.popToTop);
      await deleteProduct(id);
      console.log("deleteProduct resolved for id=", id);
      // On web Alert buttons may not be supported; use window.alert then reset
      if (Platform.OS === "web") {
        try {
          // window.alert is synchronous on web; show then navigate
          // eslint-disable-next-line no-alert
          window.alert("Producto borrado correctamente");
        } catch (e) {
          console.log("window.alert error:", e);
        }
        navigation.reset({ index: 0, routes: [{ name: "Products" } as any] });
      } else {
        // Show an alert for confirmation and force navigation to Products using reset
        Alert.alert("Eliminado", "Producto borrado correctamente", [
          {
            text: "OK",
            onPress: () =>
              navigation.reset({ index: 0, routes: [{ name: "Products" } as any] }),
          },
        ]);
      }
    } catch (error) {
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


  

