import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Listar() {
   const navigation = useNavigation();
  return (
    <SafeAreaView style={style.card}>
      <Image
        style={style.img}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/11729/11729921.png",
        }}
      />
      <View style={style.card_contenido}>
        <Text style={style.titulo}>Lista Alumnos</Text>
        <Text style={style.contenido}>Seleccione esta opcion si desea ver la lista.</Text>
        <TouchableOpacity style={style.botonSombreado} onPress={()=> navigation.navigate("ListarAlumno")} >
          <Text style={style.textBoton}>Ir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
 card: {
    backgroundColor: "#DEEFE7", 
    margin: 15,
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 6,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 3 },
  },
  card_contenido: {
    padding: 14,
    //    backgroundColor: 'rgba(247, 151, 151, 1)',
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  contenido: {
    marginBottom: 12,
    fontSize: 12,
    color: "#000000ff",
    textAlign: "center",
  },
  img: {
    width: 50,
    height: 50,
     borderRadius:5,
     alignSelf:'center',
  },
  botonSombreado: {
    marginTop: 5,
    backgroundColor: "#159A9C",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
     alignSelf: "center",
    width:"90%"
  },
  textBoton: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
    color:"#ffffffff",
  },
});
