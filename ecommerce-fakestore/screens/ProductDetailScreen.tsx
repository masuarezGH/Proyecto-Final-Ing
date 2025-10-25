// src/screens/ProductDetailScreen.tsx
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Card, Text, Button, ActivityIndicator } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getProduct } from "../api/products";
import { product } from "../types/product";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <ActivityIndicator animating style={{ flex: 1 }} />;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Card.Cover source={{ uri: product.image }} />
        <Card.Title title={product.title} subtitle={`$${product.price}`} />
        <Card.Content>
          <Text variant="bodyMedium">{product.description}</Text>
          <Text style={{ marginTop: 8, color: "gray" }}>{product.category}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate("ProductEdit", { id })}>Editar</Button>
          <Button
            textColor="red"
            onPress={() => navigation.navigate("ProductDelete", { id: Number(id) })}
          >
            Eliminar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}
