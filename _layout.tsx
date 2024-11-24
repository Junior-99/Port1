import { Slot, useRouter } from "expo-router"; // Use useRouter to handle navigation
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";  // Import auth and types

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);  // Use FirebaseAuthTypes.User for typing
  const router = useRouter(); // Get router for navigation

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => { // Typing the user
      setUser(user);
      setLoading(false);
    });

    return () => subscriber(); // Unsubscribe on unmount
  }, []);

  // While checking auth state, show loading indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // If there's no user, navigate to the login page
  useEffect(() => {
    if (!user) {
      router.replace("/login"); // Redirect to login page if no user is authenticated
    } else {
      // Optionally, you could route to the home/dashboard if the user is logged in
      router.replace("/home"); // Adjust this path if necessary
    }
  }, [user, router]);

  return <Slot />;  // Render the Slot component after the loading and auth check
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
