// src/screens/ProductListScreen.tsx
// Pantalla principal: lista de productos
// Muestra los productos, permite navegar a detalle/editar/eliminar y agregar uno nuevo.
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { FAB, Card, Text, ActivityIndicator } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useProducts } from "../hooks/useProducts";
import { product } from "../types/product";

type Props = NativeStackScreenProps<RootStackParamList, "Products">;

export default function ProductListScreen({ navigation, route }: Props) {
  // Usamos el hook reutilizable que encapsula la llamada a la API
  const { products, loading, error, refetch } = useProducts();


  if (loading) return <ActivityIndicator animating={true} style={{ flex: 1 }} />;

  return (
    <>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }} onPress={() => navigation.navigate("ProductDetail", { id: item.id })}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Title title={item.title} subtitle={`$${item.price}`} />
            <Card.Actions>
              <Text style={{ marginRight: 10 }}>{item.category}</Text>
            </Card.Actions>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
        }}
        onPress={() => navigation.navigate("ProductAdd")}
        label="Agregar"
      />
      {/* Las notificaciones globales las maneja NotificationProvider (Snackbar global). */}
    </>
  );
}
