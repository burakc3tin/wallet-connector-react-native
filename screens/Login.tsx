import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from "../redux/userSlice";
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');  

export default function Login({ navigation }) {
  const dispatch = useDispatch();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
      if (userEmail) {
        navigation.navigate('Navigator');
      }
    } catch (error) {
      console.error('Oturum kontrol hatası:', error);
    }
  };

  const login = async () => {
    try {
      auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => {
         AsyncStorage.setItem('userEmail',email);
          navigation.navigate('Navigator')
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
  }
  return (
    <View style={styles.container}>
       <Image
        source={require('../assets/images/loginimage.png')}
        style={{
          width: '100%', // Yüzde yüz genişlik
          height: height, // Ekran yüksekliğinin 1/4'ü kadar yükseklik
        }}
        resizeMode="cover" // Resmi kırpma olmadan görüntüle
      />
    <View style={styles.bottomContainer}>
      
    <Text style={styles.titleText}>Welcome back!</Text>
    <Text style={styles.altText}>Start accessing your wallets with WalletC🪙nnector</Text>
      <View style={styles.inputView}>
      <Image
        source={require('../assets/images/email.png')}
        style={{
          width: 15, // Yüzde yüz genişlik
          height: 15, // Ekran yüksekliğinin 1/4'ü kadar yükseklik
        }}
        resizeMode="cover" // Resmi kırpma olmadan görüntüle
      />
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          value={email}
          placeholderTextColor="#FFEAE3"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
      <Image
        source={require('../assets/images/password.png')}
        style={{
          width: 15, // Yüzde yüz genişlik
          height: 15, // Ekran yüksekliğinin 1/4'ü kadar yükseklik
         
        }}
        resizeMode="cover" // Resmi kırpma olmadan görüntüle
      />
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          value={password}
          placeholderTextColor="#FFEAE3"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
        <Text style={styles.createAccount}>Don't you have an account?</Text> 
      </TouchableOpacity> 
      
      <TouchableOpacity 
        onPress={login}
        style={styles.loginButton}>
            <Image
        source={require('../assets/images/inputgradient.jpg')}
        style={styles.backgroundImage}
      />
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
    </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    
  
  }, backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,

  },
  backgroundInputImage:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,

  },
  bottomContainer: {
    flex: 1,
    position:'absolute',
    marginTop:height/3.55,
    paddingTop:height/20,
    height:height,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width:width,
    alignItems: "center",
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
  
  },  
  loginText:{
    color:'#fff',
    letterSpacing:2
  },
  titleText:{
    color:'#fff',
    letterSpacing:2,
    fontSize:height/30
  },
  altText:{
    color:'gray',
    paddingBottom:height/20,
    paddingTop:height/200,
    letterSpacing:2,
    fontSize:height/75
  },
  inputView: {
    backgroundColor: 'rgba(128, 0, 128, 0.5)',
    borderRadius: 30,
    width: width/1.3,
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    flexDirection:'row',
    paddingLeft: width/3.5
  },
  TextInput: {
     height: 50,
    flex: 1,
    marginLeft: 5,
  },
  createAccount: {
    height: 30,
    marginBottom: 30,
    color:'#fff',
    letterSpacing:2
  },
  loginButton: {
    width: "80%",
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
