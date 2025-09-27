import * as React from "react";
import { StyleSheet, Platform,View, StatusBar } from "react-native";
import { Provider as PaperProvider, Appbar, Card, Text, Switch, Divider } from "react-native-paper";

import Lista from "../../Components/Lista";
import Registrar from "../../Components/Registrar";

export default function PantallaInicio() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev);
    setCount((prev) => prev + 1);
  };

  return (
    <PaperProvider >
      <Appbar.Header style={{ backgroundColor: isEnabled ? "#0f465fff" : "#61a591ff" }}>
        <Appbar.Content title="CRUD de alumnos" titleStyle={styles.title} />
      </Appbar.Header>

      <Card style={[styles.container, { backgroundColor: isEnabled ? "#0f465fff" : "#f0f5f2" }]}>
        <Card.Content >
          {/* Lista */}
          <Lista />
          <Divider style={{ marginVertical: 12 }} />
          {/* Registrar */}
          <Registrar />
          {/* Switch */}
          <Text variant="bodyMedium" style={styles.text}>
            Cambiar de color
          </Text>
          <View style={{ alignItems: "center", marginTop: 10 }}>
          <Switch value={isEnabled} onValueChange={toggleSwitch} />
          </View>
          {/* Contador */}
          <Text variant="bodySmall" style={styles.text}>
            Veces que activaste el botón: {count}
          </Text>
        </Card.Content>
      </Card>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    margin: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color:"#6b8375ff",
    textAlign: "center",
    marginTop: 10,
  },
});
