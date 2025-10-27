// Componente visual que muestra un producto en una tarjeta compacta.
// Recibe handlers para ver, editar o eliminar el producto.
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { product } from "../types/product";

type Props = {
  product: product;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductCard({ product, onPress, onEdit, onDelete }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        {/* Título y precio del producto */}
        <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          {/* Acciones rápidas: editar y eliminar */}
          <Button mode="contained" onPress={onEdit}>
            Editar
          </Button>
          <Button mode="contained" onPress={onDelete}>
            Eliminar
          </Button>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", marginBottom: 10, borderBottomWidth: 1, padding: 10 },
  image: { width: 60, height: 60, resizeMode: "contain" },
  title: { fontWeight: "bold" },
  price: { color: "green" },
});
