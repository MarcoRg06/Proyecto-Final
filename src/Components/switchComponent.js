import { View, Text, StyleSheet, Switch } from "react-native";
import { useState } from "react";

export default function SwitchComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={[styles.card, { backgroundColor: isEnabled ? "#81b0ff" : "#f4f4f4" }]}>
      <Text style={styles.text}>{isEnabled ? "Activo" : "Inactivo"}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#34C759" }}
        thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
