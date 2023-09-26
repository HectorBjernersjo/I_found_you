import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout, getSavedUser } from './UserHandler';
import LoggedInScreen from './LoggedInScreen';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const savedUser = await getSavedUser();
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    checkLoggedInStatus();
  }, []);


  return (
    <View style={styles.container}>
      {user ? (
        <LoggedInScreen user={user} />
      ) : (
        <>
          <Text style={styles.title}>Welcome to the Home Screen</Text>
          <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
          <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
        </>
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
