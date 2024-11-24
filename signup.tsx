import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "@react-native-firebase/auth";  // Update imports
import { auth } from "../firebaseConfig"; // Import auth from your firebaseConfig file

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    setLoading(true);
    try {
      const authInstance = getAuth();  // Get the auth instance from firebase
      await createUserWithEmailAndPassword(authInstance, email, password);  // Use the updated signup method
    } catch (error: any) {
      alert("Signup Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={signup}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", padding: 10, borderColor: "#ccc", borderWidth: 1, marginBottom: 15, borderRadius: 5 },
  button: { width: "100%", padding: 15, backgroundColor: "#6200ea", borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18 },
});
