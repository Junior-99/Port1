import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';



export default function Home() {
  type Item = {
    id: string;
    title: string;
    description: string;
    price: string;
    createdAt: string;
  };

  const [form, setForm] = useState<{ title: string; description: string; price: string; imageUrl: string }>({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const [items, setItems] = useState<Item[]>([]); // State for storing items from Firebase

  // Function to upload an item to Firebase
  const uploadItem = () => {
    const newItemRef = database().ref('/items').push();
    newItemRef
      .set({ ...form, createdAt: new Date().toISOString() })
      .then(() => alert('Item uploaded successfully!'))
      .catch((err) => alert(`Error: ${err.message}`));

    setForm({ title: '', description: '', price: '', imageUrl: '' }); // Reset the form after submission
  };

  // Function to fetch items from Firebase
  const fetchItems = () => {
    database()
      .ref('/items')
      .on('value', (snapshot) => {
        const data = snapshot.val() || {}; // Fallback to an empty object if no data
        const parsedData: Item[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key], // Merge data with id as key
        }));
        setItems(parsedData); // Update state with fetched items
      });
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload New Item</Text>
      <TextInput
        placeholder="Title"
        value={form.title}
        onChangeText={(value) => setForm((prev) => ({ ...prev, title: value }))}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={form.description}
        onChangeText={(value) => setForm((prev) => ({ ...prev, description: value }))}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        value={form.price}
        onChangeText={(value) => setForm((prev) => ({ ...prev, price: value }))}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={form.imageUrl}
        onChangeText={(value) => setForm((prev) => ({ ...prev, imageUrl: value }))}
        style={styles.input}
      />
      <Button title="Upload Item" onPress={uploadItem} />
      <Text style={styles.listHeader}>Items Uploaded</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 5 },
  listHeader: { fontSize: 20, fontWeight: 'bold', marginVertical: 20 },
  item: { marginBottom: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
  title: { fontWeight: 'bold', fontSize: 16 },
  description: { fontSize: 14, color: '#555' },
  price: { fontSize: 14, color: '#00a' },
});
