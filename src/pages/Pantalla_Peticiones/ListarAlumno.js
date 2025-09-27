import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Icon } from "react-native-paper";

export const ListarAlumno = () => {
  const navigation = useNavigation();
  const [alumnos, setAlumnos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get("http://192.168.0.106:3000/alumnos");
      setAlumnos(response.data);
    } catch (error) {
      console.error(error); 
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setRefreshing(false);
    }
  };

  const handleEliminarAlumno = (alumno) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de eliminar el registro de ${alumno.nombre}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () => eliminarAlumno(alumno.numero_control),
          style: "destructive",
        },
      ]
    );
  };

  const eliminarAlumno = async (numeroControl) => {
    try {
      await axios.delete(`http://192.168.0.106:3000/alumnos/${numeroControl}`);

      setAlumnos(
        alumnos.filter((alumno) => alumno.numero_control !== numeroControl)
      );
      Alert.alert("Éxito", "Alumno eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
      Alert.alert("Error", "No se pudo eliminar el alumno");
    }
  };

  return (
    <SafeAreaView style={style.mainS}>
      {/* AppBar */}
      <View style={style.appBar}>
        <TouchableOpacity
          style={style.botonIconoP}
          onPress={() => navigation.navigate("PantallaInicio")}
        >
          <Ionicons name="chevron-back" size={22} color={"#ffffffff"} />
        </TouchableOpacity>

        <Text style={style.appBarTitle}>Alumnos registrados</Text>

        {/* Botón de Refrescar */}
        <TouchableOpacity
          style={style.refreshButton}
          onPress={fetchAlumnos}
          disabled={refreshing}
        >
          <Ionicons
            name="refresh"
            size={26}
            color={refreshing ? "#666" : "#ffffffff"}
          />
        </TouchableOpacity>
      </View>
      <View style={style.linea} />

      {/* Contenido */}
      <ScrollView style={{ padding: 16 }}>
        <View style={style.sectionHeader}>
          <Text style={style.sectiontitle}>
            Alumnos de Aplicaciones Moviles
          </Text>
          {refreshing && (
            <Text style={style.refreshingText}>Actualizando...</Text>
          )}
        </View>

        {alumnos.map((alumno, index) => (
          <View key={alumno.numero_control || index} style={style.card}>
            <TouchableOpacity style={style.agregarImagen}>
              <Icon />
              <Image
                source={{
                  uri: "https://sdmntprukwest.oaiusercontent.com/files/00000000-00b4-6243-a758-f25468fa421e/raw?se=2025-09-26T16%3A57%3A20Z&sp=r&sv=2024-08-04&sr=b&scid=92fe9893-dfe4-5fa8-aa7a-0cdd2a275260&skoid=a3412ad4-1a13-47ce-91a5-c07730964f35&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-25T17%3A54%3A46Z&ske=2025-09-26T17%3A54%3A46Z&sks=b&skv=2024-08-04&sig=stL/xy1blxMghu7RGyWTyUZBuK66hGT6nUj2yJ6NALo%3D",
                }}
                style={style.avatar}
              />
            </TouchableOpacity>

            <View style={style.cardInfo}>
              <Text style={style.userName}>Nombre: {alumno.nombre}</Text>
              <Text style={style.userUser}>Carrera: {alumno.carrera}</Text>
              <Text style={style.userUser}>
                N° Control: {alumno.numero_control}
              </Text>
              <Text style={style.userUser}>
                Correo: {alumno.correo_electronico}
              </Text>
              <Text style={style.userUser}>Telefono: {alumno.telefono}</Text>

              <View style={style.botones}>
                <TouchableOpacity
                  style={style.saveButton1}
                  onPress={() => handleEliminarAlumno(alumno)}
                >
                  <Ionicons
                    name="trash"
                    size={20}
                    color={"#fff"}
                    style={style.iconizquierda}
                  />
                  <Text style={style.saveButtonText}>Eliminar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={style.saveButton2}
                  onPress={() =>
                    navigation.navigate("Actualizar", {
                      alumno: alumno,
                      onUpdate: fetchAlumnos,
                    })
                  }
                >
                  <Ionicons
                    name="create"
                    size={20}
                    color={"#fff"}
                    style={style.iconizquierda}
                  />
                  <Text style={style.saveButtonText}>Actualizar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  mainS: {
    flex: 0,
    backgroundColor: "#ffffffff",
    height: "100%",
  },
  appBar: {
    height: 60,
    backgroundColor:"#61a591ff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  linea: {
    height: 2,
    backgroundColor: "#ccc",

    width: "100%",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  appBarTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 10,
    
    color:"#ffffffff",
  },
  refreshButton: {
    padding: 5,
    marginLeft: "auto",
  },
  sectiontitle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 16,
  },
  card: {
    padding: 16,
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: "#DEEFE7",
    elevation: 2,
    marginBottom: 5,
    alignItems: "center",
  },
  botones: {
    borderRadius: 3,
    flexDirection: "row",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderColor: "#000000ff",
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
    
  },
  agregarImagen: {},
  userName: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
  userUserDetails: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 10,
  },
  userUser: {
    fontSize: 15,
    marginBottom: 5,
  },
  saveButton1: {
    backgroundColor: "#ff6f65ff",
    marginTop: 10,
    padding: 10,
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  saveButton2: {
    backgroundColor: "#159A9C",
    marginTop: 10,
    padding: 10,
    alignSelf: "flex-end",
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#e7f3edff",
    fontWeight: "bold",
    flexDirection: "row",
  },
  botonIconoP: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 15,
  },

  refreshingText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    padding: 16,
  },
});

export default ListarAlumno;
