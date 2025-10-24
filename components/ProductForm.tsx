// src/components/ProductForm.tsx
import { View, TextInput, Button, Text, ActivityIndicator } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

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
          <TextInput placeholder="Título" value={values.title} onChangeText={handleChange("title")} />
          {touched.title && errors.title && <Text style={{ color: "red" }}>{errors.title}</Text>}

          <TextInput placeholder="Precio" keyboardType="numeric" value={String(values.price)} onChangeText={handleChange("price")} />
          {touched.price && errors.price && <Text style={{ color: "red" }}>{errors.price}</Text>}

          <TextInput placeholder="Descripción" multiline value={values.description} onChangeText={handleChange("description")} />
          {touched.description && errors.description && <Text style={{ color: "red" }}>{errors.description}</Text>}

          <TextInput placeholder="Categoría" value={values.category} onChangeText={handleChange("category")} />
          {touched.category && errors.category && <Text style={{ color: "red" }}>{errors.category}</Text>}

          <TextInput placeholder="URL de imagen" value={values.image} onChangeText={handleChange("image")} />
          {touched.image && errors.image && <Text style={{ color: "red" }}>{errors.image}</Text>}

          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button title={submitLabel} onPress={() => handleSubmit()} />
          )}
        </View>
      )}
    </Formik>
  );
}
