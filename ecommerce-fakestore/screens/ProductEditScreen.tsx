// src/screens/ProductEditScreen.tsx
import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
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
    await updateProduct(id, { ...values, price: Number(values.price) });
    Alert.alert("Éxito", "Producto actualizado");
    navigation.navigate("ProductDetail", { id });
  }

  if (!initialValues) return <ActivityIndicator animating style={{ flex: 1 }} />;

  return (
    <View style={{ padding: 16 }}>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
    </View>
  );
}
