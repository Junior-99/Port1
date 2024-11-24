import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";  // Ensure proper import from firebaseConfig

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const auth = getAuth(); // Getting auth instance
      await signInWithEmailAndPassword(auth, email, password);  // Using the auth instance to sign in
    } catch (error: any) {
      alert("Login Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.button} onPress={login}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
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
