import React from 'react';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to home after 3 seconds
    const timeout = setTimeout(() => {
      router.replace("/home");  // Ensure the path is correct relative to your structure
    }, 3000);

    return () => clearTimeout(timeout);  // Cleanup timeout on component unmount
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp</Text>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
