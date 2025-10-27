// src/screens/ProductDetailScreen.tsx
// Pantalla de detalle de un producto
// Muestra la información completa y ofrece acciones: editar o eliminar.
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Card, Text, Button, ActivityIndicator } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { product } from "../types/product";
import { useProduct } from "../hooks/useProduct";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  // Usamos el hook reutilizable para obtener el producto por id
  const { product, loading, error } = useProduct(id);

  if (loading || !product) return <ActivityIndicator animating style={{ flex: 1 }} />;

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
          {/* Botón para ir a la pantalla de edición pasando el id del producto */}
          <Button onPress={() => navigation.navigate("ProductEdit", { id })}>Editar</Button>
          {/* Botón para ir a la pantalla de eliminación (confirmación) */}
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
