// src/screens/ProductListScreen.tsx
// Pantalla principal: lista de productos
// Muestra los productos, permite navegar a detalle/editar/eliminar y agregar uno nuevo.
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { FAB, Card, Text, ActivityIndicator, Snackbar } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getProducts } from "../api/products";
import { product } from "../types/product";

type Props = NativeStackScreenProps<RootStackParamList, "Products">;

export default function ProductListScreen({ navigation, route }: Props) {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    // Cargar productos desde la API al montar la pantalla.
    // getProducts devuelve una promesa con el array de productos.
    getProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  // Show a transient message when navigated here with a message param
  useEffect(() => {
    // Si otra pantalla navegó aquí con un parámetro `message`, lo mostramos en un Snackbar.
    // Esto permite feedback consistente tras operaciones (crear/editar/eliminar).
    const msg = route.params && (route.params as any).message;
    if (msg) {
      setSnackMessage(String(msg));
      setSnackVisible(true);
      // Limpiamos el parámetro para que no reaparezca en futuras navegaciones.
      navigation.setParams({ message: undefined } as any);
    }
  }, [route.params]);


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
      <Snackbar visible={snackVisible} onDismiss={() => setSnackVisible(false)} duration={2000}>
        {snackMessage}
      </Snackbar>
    </>
  );
}
