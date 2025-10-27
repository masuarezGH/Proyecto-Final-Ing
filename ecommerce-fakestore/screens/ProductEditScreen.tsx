// src/screens/ProductEditScreen.tsx
// Pantalla para editar un producto existente
// Carga los valores iniciales, muestra el formulario y al guardar notifica y vuelve al listado.
import { useEffect, useState } from "react";
import { View, Alert, Platform, ToastAndroid } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { updateProduct } from "../api/products";
import { useNotification } from "../contexts/NotificationContext";
import { useProduct } from "../hooks/useProduct";
import ProductForm, { Values } from "../components/ProductForm";
import { product } from "../types/product";
import { ActivityIndicator } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "ProductEdit">;

export default function ProductEditScreen({ route, navigation }: Props) {
  const { id } = route.params;
  // Usamos el hook reutilizable para cargar el producto
  const { product, loading, error, refetch } = useProduct(id);
  const initialValues: Values | null = product
    ? {
        title: product.title,
        price: String(product.price),
        description: product.description,
        category: product.category,
        image: product.image,
      }
    : null;

  const { notify } = useNotification();

  async function handleSubmit(values: Values) {
    // Al enviar los cambios llamamos a la API para actualizar el producto.
    // Luego mostramos confirmación (toast/alert) y volvemos al listado pasando un `message`.
    try {
      await updateProduct(id, { ...values, price: Number(values.price) });
      const msg = `Producto actualizado`;
      // Toast en Android para feedback rápido
      if (Platform.OS === "android") {
        try {
          ToastAndroid.show(msg, ToastAndroid.SHORT);
        } catch (e) {
          // ignorar si falla
        }
      }

      // En web usamos window.alert (sincronico) y además notificamos globalmente.
      if (Platform.OS === "web") {
        try {
          window.alert(msg);
        } catch (e) {
          Alert.alert("Éxito", msg);
        }
        notify(msg);
        navigation.reset({ index: 0, routes: [{ name: "Products" }] });
        return;
      }

      // En nativo mostramos un Alert con botón OK que notifica y reinicia la navegación.
      Alert.alert("Éxito", msg, [
        {
          text: "OK",
          onPress: () => {
            notify(msg);
            navigation.reset({ index: 0, routes: [{ name: "Products" }] });
          },
        },
      ]);
    } catch (e: any) {
      Alert.alert("Error", e.message || String(e));
    }
  }

  if (loading || !initialValues) return <ActivityIndicator animating style={{ flex: 1 }} />;

  return (
    <View style={{ padding: 16 }}>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
    </View>
  );
}
