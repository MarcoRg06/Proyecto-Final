import { View,Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform, KeyboardAvoidingView,
 Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Actualizar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { alumno } = route.params;

  const [numeroControl, setNumeroControl] = useState(alumno.numero_control);
  const [nombre, setNombre] = useState(alumno.nombre);
  const [carrera, setCarrera] = useState(alumno.carrera);
  const [correo, setCorreo] = useState(alumno.correo_electronico);
  const [telefono, setTelefono] = useState(alumno.telefono);

  const actualizarAlumno = async () => {
    if (!numeroControl || !nombre || !carrera || !correo || !telefono) {
      Alert.alert("Advertencia", "¡Por favor llena todos los campos!");
      return;
    }
    try {
      await axios.put(`http://192.168.0.106:3000/alumnos/${alumno.numero_control}`, {
        nombre,
        carrera,
        correo_electronico: correo,
        telefono
      });
      Alert.alert("Éxito", "Alumno actualizado correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudo actualizar el alumno");
    }
  };

  const limpiarCampos = () => {
    setNombre("");
    setCarrera("");
    setCorreo("");
    setTelefono("");
  };

  return (
    <SafeAreaView style={styles.mainS}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={styles.appBar}>
              <TouchableOpacity style={styles.botonIconoP} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={22} color={"#ffffffff"} />
              </TouchableOpacity>
              <Text style={styles.appBarTitle}>Cambiar Alumno</Text>
            </View>
            <View style={styles.linea} />
            <ScrollView style={{ padding: 16 }}>
              <View style={styles.card}>
                <Text style={styles.titulo}>ACTUALIZAR</Text>
                <Text style={styles.labelEspecial}>Número de Control:</Text>
                <TextInput  style={styles.inputEspecial} value={numeroControl.toString()}   editable={false}   selectTextOnFocus={false} />
                <Text style={styles.label}>Nombre:</Text>
                <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
                <Text style={styles.label}>Carrera:</Text>
                <TextInput style={styles.input} value={carrera} onChangeText={setCarrera} />
                <Text style={styles.label}>Correo Electrónico:</Text>
                <TextInput style={styles.input} value={correo}  onChangeText={setCorreo}     keyboardType="email-address"   />
                <Text style={styles.label}>Teléfono:</Text>
                <TextInput  style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad"/>
                {/* Botón Actualizar */}
                <TouchableOpacity style={styles.botonIcono} onPress={actualizarAlumno}>
                  <Ionicons name="save" size={20} color={"#fff"} style={styles.iconIzquierda} />
                  <Text style={styles.textoBoton}>Actualizar Alumno</Text>
                </TouchableOpacity>
                {/* Botón Limpiar */}
                <TouchableOpacity style={[styles.botonIcono, { backgroundColor: "#f54242" }]} onPress={limpiarCampos}>
                  <Ionicons name="trash" size={20} color={"#fff"} style={styles.iconIzquierda} />
                  <Text style={styles.textoBoton}>Limpiar contenido</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainS: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  appBar: {
    height: 60,
    width: "100%",
    
    
    backgroundColor:"#61a591ff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  appBarTitle: {
    
    color:"#ffffffff",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: "#DEEFE7",
    borderRadius: 15,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#505a57ff",
  
    paddingVertical:15
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 10,
  },
  labelEspecial: {
    fontWeight: "bold",
    color: "#9aa79cff",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#12c238ff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  inputEspecial: {
    borderWidth: 1,
    borderColor: "#afebbcff",
    borderRadius: 10,
    padding: 10,
    color: "#9aa79cff",
    marginBottom: 12,
  },
  linea: {
    height: 2,
    backgroundColor: "#ccc",

    width: "100%",
  },
  botonIcono: {
    backgroundColor: "#159A9C",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 15,
  },
  iconIzquierda: {
    marginRight: 12,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  botonIconoP: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
});

export default Actualizar;
