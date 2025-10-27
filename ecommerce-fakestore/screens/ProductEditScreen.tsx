// src/screens/ProductEditScreen.tsx
// Pantalla para editar un producto existente
// Carga los valores iniciales, muestra el formulario y al guardar notifica y vuelve al listado.
import { useEffect, useState } from "react";
import { View, Alert, Platform, ToastAndroid } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getProduct, updateProduct } from "../api/products";
import ProductForm, { Values } from "../components/ProductForm";
import { product } from "../types/product";
import { ActivityIndicator } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "ProductEdit">;

export default function ProductEditScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [initialValues, setInitialValues] = useState<Values | null>(null);

  useEffect(() => {
    // Al montar la pantalla traemos los datos del producto para rellenar el formulario.
    getProduct(id).then((p: product) =>
      setInitialValues({
        title: p.title,
        price: String(p.price),
        description: p.description,
        category: p.category,
        image: p.image,
      })
    );
  }, [id]);

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

      // En web usamos window.alert (sincronico) y después reiniciamos la navegación.
      if (Platform.OS === "web") {
        try {
          window.alert(msg);
        } catch (e) {
          // Si no existe window.alert, fallback a Alert de react-native
          Alert.alert("Éxito", msg);
        }
        navigation.reset({ index: 0, routes: [{ name: "Products", params: { message: msg } }] });
        return;
      }

      // En nativo mostramos un Alert con botón OK que, al presionar, reinicia la navegación.
      Alert.alert("Éxito", msg, [
        {
          text: "OK",
          onPress: () => navigation.reset({ index: 0, routes: [{ name: "Products", params: { message: msg } }] }),
        },
      ]);
    } catch (e: any) {
      Alert.alert("Error", e.message || String(e));
    }
  }

  if (!initialValues) return <ActivityIndicator animating style={{ flex: 1 }} />;

  return (
    <View style={{ padding: 16 }}>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
    </View>
  );
}
