// src/screens/ProductAddScreen.tsx
// Pantalla para crear un nuevo producto
// Contiene el formulario y la lógica para llamar a la API y volver al listado con feedback.
import { useState } from "react";
import { View, Alert, Platform, ToastAndroid } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { createProduct } from "../api/products";
import ProductForm, { Values } from "../components/ProductForm";

type Props = NativeStackScreenProps<RootStackParamList, "ProductAdd">;

export default function ProductAddScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);

  const initialValues: Values = {
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  };

  async function handleSubmit(values: Values) {
    // Al enviar el formulario llamamos a la API para crear el producto.
    // Luego damos retroalimentación al usuario y volvemos al listado usando navigation.reset
    // para pasar un mensaje que el `ProductListScreen` mostrará en un Snackbar.
    try {
      setLoading(true);
      const payload = { ...values, price: Number(values.price) };
      const created = await createProduct(payload);
      const msg = `Producto agregado con ID ${created.id}`;
      // En Android mostramos un Toast nativo (opcional) para feedback rápido.
      if (Platform.OS === "android") {
        try {
          ToastAndroid.show(msg, ToastAndroid.SHORT);
        } catch (err) {
          // Si falla ToastAndroid, no interrumpimos el flujo.
        }
      }
      // Reiniciamos la pila de navegación y pasamos el mensaje como parámetro.
      navigation.reset({ index: 0, routes: [{ name: "Products", params: { message: msg } }] });
    } catch (e: any) {
      // Mostrar error genérico en caso de fallo de la API.
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 16 }}>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Agregar" loading={loading} />
    </View>
  );
}
