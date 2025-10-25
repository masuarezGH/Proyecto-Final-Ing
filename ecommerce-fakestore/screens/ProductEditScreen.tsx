// src/screens/ProductEditScreen.tsx
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
    try {
      await updateProduct(id, { ...values, price: Number(values.price) });
      const msg = `Producto actualizado`;
      // Android quick toast (optional)
      if (Platform.OS === "android") {
        try {
          ToastAndroid.show(msg, ToastAndroid.SHORT);
        } catch (e) {
          // ignore
        }
      }

      // Web: window.alert is synchronous, show it then reset navigation
      if (Platform.OS === "web") {
        try {
          window.alert(msg);
        } catch (e) {
          // fallback to Alert
          Alert.alert("Éxito", msg);
        }
        navigation.reset({ index: 0, routes: [{ name: "Products", params: { message: msg } }] });
        return;
      }

      // Native: show an Alert with an OK button that resets to Products
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
