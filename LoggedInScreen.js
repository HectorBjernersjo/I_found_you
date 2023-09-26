import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './config';
import { logout, getSavedUser } from './UserHandler';

export default function LoggedInScreen({ navigation }) {
  const [user, setUser] = useState(null);  // Initialize user state

  useEffect(() => {
    const fetchUser = async () => {  // Declare an async function
      const savedUser = await getSavedUser();  // Await getSavedUser()
      setUser(savedUser);  // Set user state
    };

    fetchUser();  // Call the async function
  }, []);  // Run once when the component mounts

  const handleLogout = () => {
    logout();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Logged in as {user.username || user}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
