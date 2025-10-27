// Componente de formulario reutilizable para crear/editar productos.
// Usa Formik para gestionar estado del formulario y Yup para validación.
import { View, Text } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

// Esquema de validación: se asegura que los campos requeridos estén completos
// y que la URL de la imagen sea válida.
const schema = Yup.object({
  title: Yup.string().required("Título requerido"),
  price: Yup.number().required("Precio requerido"),
  description: Yup.string().required("Descripción requerida"),
  category: Yup.string().required("Categoría requerida"),
  image: Yup.string().url("Debe ser una URL válida").required("Imagen requerida"),
});

export type Values = {
  title: string;
  price: string | number;
  description: string;
  category: string;
  image: string;
};

type Props = {
  initialValues: Values;
  onSubmit: (v: Values, formikHelpers: FormikHelpers<Values>) => Promise<void> | void;
  submitLabel?: string;
  loading?: boolean;
};

export default function ProductForm({ initialValues, onSubmit, submitLabel = "Guardar", loading }: Props) {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ values, handleChange, handleSubmit, errors, touched }) => (
        <View style={{ gap: 8 }}>
          {/* Campo Título */}
            <TextInput label="Título" value={values.title} onChangeText={handleChange("title")} />
          {touched.title && errors.title && <Text style={{ color: "red" }}>{errors.title}</Text>}

          {/* Campo Precio (guardamos como string en el formulario) */}
            <TextInput label="Precio" keyboardType="numeric" value={String(values.price)} onChangeText={handleChange("price")} />
          {touched.price && errors.price && <Text style={{ color: "red" }}>{errors.price}</Text>}

          {/* Descripción larga */}
            <TextInput label="Descripción" multiline value={values.description} onChangeText={handleChange("description")} />
          {touched.description && errors.description && <Text style={{ color: "red" }}>{errors.description}</Text>}

          {/* Categoría del producto */}
            <TextInput label="Categoría" value={values.category} onChangeText={handleChange("category")} />
          {touched.category && errors.category && <Text style={{ color: "red" }}>{errors.category}</Text>}

          {/* URL de la imagen */}
            <TextInput label="URL de imagen" value={values.image} onChangeText={handleChange("image")} />
          {touched.image && errors.image && <Text style={{ color: "red" }}>{errors.image}</Text>}

          {/* Botón / indicador de envío */}
          {loading ? (
            <ActivityIndicator />
          ) : (
              <Button mode="contained" onPress={() => handleSubmit()}>
                {submitLabel}
              </Button>
          )}
        </View>
      )}
    </Formik>
  );
}
