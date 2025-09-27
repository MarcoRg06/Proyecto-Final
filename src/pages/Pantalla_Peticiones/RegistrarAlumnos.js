import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export const RegistrarAlumnos = () => {
  const navigation = useNavigation();

  const [numeroControl, setNumeroControl] = useState("");
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const registrarAlumno = async () => {
    if (!numeroControl || !nombre || !carrera || !correo || !telefono) {
      Alert.alert("Advertencia", "¡Por favor llena todos los campos!");
      return;
    }
    if (numeroControl.length !== 8) {
      Alert.alert(
        "Error",
        "El número de control debe tener exactamente 8 dígitos."
      );
      return;
    }
    if (telefono.length < 10) {
      Alert.alert(
        "Error",
        "El número de teléfono debe tener al menos 10 dígitos."
      );
      return;
    }
    try {
      const response = await fetch("http://192.168.0.106:3000/alumnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numero_control: parseInt(numeroControl),
          nombre,
          carrera,
          correo_electronico: correo,
          telefono,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", data.message);
        navigation.navigate("PantallaInicio");
      } else {
        Alert.alert("Error", data.error || "No se pudo registrar");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  const limpiarCampos = () => {
    setNumeroControl("");
    setNombre("");
    setCarrera("");
    setCorreo("");
    setTelefono("");
  };

  return (
    <SafeAreaView style={style.mainS}>
      <KeyboardAvoidingView
        style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}  
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}  >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={style.appBar}>
              <TouchableOpacity
                style={style.botonIconoP}
                onPress={() => navigation.navigate("PantallaInicio")}  >
                <Ionicons name="chevron-back" size={22} color={"#ffffffff"} />
              </TouchableOpacity>
              <Text style={style.appBarTitle}>Registro de Alumnos</Text>
            </View>

            <View style={style.linea} />
            <View style={style.card}>
              <ScrollView style={{ padding: 16 }}>
                <Text style={style.titulo}>ALTA</Text>
                <Text style={style.label}>Nombre:</Text>
                <TextInput style={style.input} placeholder="Escribe tu Nombre" value={nombre} onChangeText={setNombre}/>
                <Text style={style.label}>Carrera:</Text>
                <TextInput style={style.input} placeholder="Escribe tu Carrera" value={carrera} onChangeText={setCarrera} />
                <Text style={style.label}>Número de control:</Text>
                <TextInput style={style.input} placeholder="Ingrese su número de Control" keyboardType="numeric" value={numeroControl}
                 onChangeText={(text) => {
                    const filtered = text.replace(/[^0-9]/g, "");
                    if (filtered.length <= 8) setNumeroControl(filtered); }}
                  maxLength={8}  />
                <Text style={style.label}>Correo Electrónico:</Text>
                <TextInput style={style.input} placeholder="Escribe el correo electrónico" keyboardType="email-address"value={correo} 
                 onChangeText={setCorreo}/>
                <Text style={style.label}>Teléfono:</Text>
                <TextInput  style={style.input}  placeholder="+52 - - -  - - -  - -  - -"  keyboardType="phone-pad" value={telefono}
                  onChangeText={(text) => {
                    const filtered = text.replace(/[^0-9]/g, "");
                    if (filtered.length <= 10) setTelefono(filtered);
                  }}   maxLength={10} />
                <TouchableOpacity  style={style.botonIcono} onPress={registrarAlumno}            >
                  <Ionicons  name="send" size={20}  color={"#fff"} style={style.iconizquierda}                  />
                  <Text style={style.textoBoton}>Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.botonIcono, { backgroundColor: "#f05454" }]} onPress={limpiarCampos} >
                  <Ionicons name="trash"      size={20}  color={"#fff"}    style={style.iconizquierda}   />
                  <Text style={style.textoBoton}>Limpiar campos</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainS: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  appBarTitle: {
    fontWeight: "bold",
    color: "#ffffffff",
    fontSize: 20,
    paddingLeft: 10,
  },
  appBar: {
    height: 50,
    width: "100%",
    backgroundColor: "#61a591ff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  linea: {
    height: 2,
    backgroundColor: "#ccc",

    width: "100%",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#505a57ff",
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#12c238ff",
    borderRadius: 10,
    padding: 10,
  },
  botonIcono: {
    backgroundColor: "#159A9C",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 15,
  },
  botonIconoP: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  iconizquierda: {
    marginRight: 12,
  },
  textoBoton: {
    color: "#fffdfaff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#DEEFE7",
    margin: 20,
    borderRadius: 15,
    shadowColor: "#000",
    elevation: 4,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 3 },
    padding: 16,
  },
});

export default RegistrarAlumnos;
