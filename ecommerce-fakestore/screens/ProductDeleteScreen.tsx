// src/screens/ProductDeleteScreen.tsx
import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
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
    await deleteProduct(id);
    Alert.alert("Eliminado", "Producto borrado correctamente");
    navigation.navigate("Products");
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


  

