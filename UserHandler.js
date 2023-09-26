import { Alert } from 'react-native';
import { BASE_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveUser(sessionToken){
    const response = await fetch(`${BASE_URL}/getuser?sessionToken=${sessionToken}`, {  // Using the BASE_URL
        method: 'GET',
        // body: {"sessionToken":sessionToken},
    });
    
    const data = await response.text();
    console.log("data",data);
    
    if (response.ok) {
        await AsyncStorage.setItem('user', data);
    } else {
        Alert.alert('Error', data.message || 'An error occurred');
    }
}

async function getSavedUser(){
    const user = await AsyncStorage.getItem('user');
    return user;
}

async function logout(){
    await AsyncStorage.removeItem('SessionToken');
    await AsyncStorage.removeItem('user');  
    navigation.navigate('Home');
}

export { saveUser, getSavedUser, logout };
