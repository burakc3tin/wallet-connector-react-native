// userSlice.js

import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore'; // Firebase firestore import ediliyor
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    
  },
  reducers: {
    // Async action yerine, bir fonksiyon tanımlayın
    addUser: (state, action) => {
      try {
        // Firestore'a kullanıcı ekle
        auth()
        .createUserWithEmailAndPassword(action.payload.email,action.payload.password)
        console.log('User added!');
      } catch (error) {
        console.error('Error adding user: ', error);
      }
    },
    loginUser: (state, action) => {
      try {
        auth()
        .signInWithEmailAndPassword(action.payload.email,action.payload.password)
        .then(() => {
           AsyncStorage.setItem('userEmail', action.payload.email);
 
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            Alert.alert("Wrong email or password.")
          }
  
          if (error.code === 'auth/weak-password') {
            Alert.alert("Wrong email or password.")
          }
          if (error.code === 'auth/invalid-credential') {
            Alert.alert("Login error.")
          }
          console.error(error);
        });
       } catch (error) {
        console.error('Giriş hatası:', error);
      }
    },
    logoutUser: (state, action) => {
      auth().signOut().then(() => {
        try {
            AsyncStorage.removeItem('userEmail');
        } catch (error) {
          console.log('Çıkış işlemi başarısız oldu:', error);
        }
      }).catch(e => console.log(e.message));
    },
    changePassword: (state, action) => {
        auth().currentUser.updatePassword(action.payload.newPassword).then(()=>{
        Alert.alert("Successful changed password")
     
      })
      .catch(()=>Alert.alert("Error changed!"));
    },
  },
});

export const { addUser, loginUser, logoutUser, changePassword } = userSlice.actions;

export default userSlice.reducer;
