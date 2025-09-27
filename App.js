import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//imprimir las pantallas
import PantallaInicio from "./src/pages/Pantalla_Inicio/PantallaInicio";
import ResgistrarAlunmos from "./src/pages/Pantalla_Peticiones/RegistrarAlumnos";
import ListarAlumno from "./src/pages/Pantalla_Peticiones/ListarAlumno";
import Actualizar from "./src/pages/Pantalla_Peticiones/Actualizar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PantallaInicio"  
        screenOptions={{ headerShown: false }}>
         <Stack.Screen name="PantallaInicio" component={PantallaInicio} />
        <Stack.Screen name="RegistrarAlumnos" component={ResgistrarAlunmos} />
         <Stack.Screen name="ListarAlumno" component={ListarAlumno} />
         <Stack.Screen name="Actualizar" component={Actualizar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
