// src/screens/ProductAddScreen.tsx
import { useState } from "react";
import { View, Alert } from "react-native";
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
    try {
      setLoading(true);
      const payload = { ...values, price: Number(values.price) };
      const created = await createProduct(payload);
      Alert.alert("Éxito", `Producto agregado con ID ${created.id}`);
      navigation.navigate("Products");
    } catch (e: any) {
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
