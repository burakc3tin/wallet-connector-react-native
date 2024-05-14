import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions
} from "react-native";
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice'; 

const { width, height } = Dimensions.get('window');  

export default function Register({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retryPassword, setRetryPassword] = useState("");

  const handleCreateUser = () => {
    try {
      // No-blank checks
      if (!email || !password) {
        Alert.alert('Error', 'Email and password cannot be empty');
        return;
      }
  
      // Check password length and characters
      if (password.length < 5 || password.length > 25 || !/^[a-zA-Z0-9]+$/.test(password)) {
        Alert.alert('Error', 'Password must be between 5 and 25 characters and can only contain letters and numbers');
        return;
      }
  
      // Password match checking
      if (password !== retryPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
  
      // Dispatch Redux action to add users
      dispatch(addUser({ email, password }));
  
      // reset state
      setEmail('');
      setPassword('');
      setRetryPassword('');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error creating user: ', error);
      Alert.alert('Error', 'An error occurred while creating user');
    }
  };
  
  
 
  return (
    <View style={styles.container}>
        <Image
        source={require('../assets/images/loginimage.png')}
        style={{
          width: '100%',  
          height: height,  
        }}
        resizeMode="cover"  
      />
      <View style={styles.subContainer}> 
      <Text   style={styles.title}>WalletC🪙nnect</Text>
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
          placeholderTextColor="#FFEAE3"
          value={email}
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
          placeholderTextColor="#FFEAE3"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
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
          placeholder="Retry Password"
          placeholderTextColor="#FFEAE3"
          secureTextEntry={true}
          value={retryPassword}
          onChangeText={(password) => setRetryPassword(password)}
        /> 
      </View> 
      <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
        <Text style={styles.haveAccount}>I already have an account</Text> 
      </TouchableOpacity> 
      
      <TouchableOpacity style={styles.registerButton} onPress={handleCreateUser}>
      <Image
        source={require('../assets/images/inputgradient.jpg')}
        style={styles.backgroundImage}
      />
        <Text style={styles.registerText}>REGISTER</Text> 
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
    justifyContent: "center",
  },
  subContainer: {
    position:'absolute',
    flex:1,
    alignItems:'center',
    width: width
  },
  title :{
    fontFamily: 'Pacifico',
    fontSize:height/30,
    color:'wheat',
    paddingBottom:height/30
  },
  inputView: {
    backgroundColor: 'rgba(128, 0, 128, 0.5)',
    borderRadius: 30,
    width: width/1.3,
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    flexDirection:'row',
    paddingLeft: width/3.5,  
  },
  haveAccount: {
    height: 30,
    marginBottom: 30,
    color:'#fff',
    letterSpacing:2
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    },
  registerButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,

  },
  registerText: {
    color: "white",
  },
});
