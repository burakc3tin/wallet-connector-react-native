//import liraries
import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert,ImageBackground,Dimensions,TouchableOpacity,Image  } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser, changePassword } from '../../redux/userSlice';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');  
const user = auth().currentUser;

 
const Profile = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  
    const dispatch = useDispatch();
    const handleChangePassword = async () => {
 
      dispatch(changePassword({newPassword}));
    }
    const handleLogout = async () => {
      try {
        dispatch(logoutUser());
        navigation.navigate('Login');
      } catch (error) {
        console.error("Logout dispatch error:", error);
       
      }
    };

    return (
        <ImageBackground 
            source={require('../../assets/images/mainwallpaper2.png')}
            style={styles.background}
        >
             <TouchableOpacity onPress={handleLogout}>
             <Image
        source={require('../../assets/images/quit.png')}
        style={{
          width: width/14.4, // Yüzde yüz genişlik
          height: height/30, // Ekran yüksekliğinin 1/4'ü kadar yükseklik
         marginLeft:width/1.15,
         marginTop:height/150
        }}
        resizeMode="cover" // Resmi kırpma olmadan görüntüle
      />
           </TouchableOpacity>
            <View style={styles.container}>
                <Text  style={styles.titleChangePassword}
>Change to password</Text>
                <TextInput
          placeholder="🔐 New Password"
          value={newPassword}
          style={styles.inputView}
          secureTextEntry={true}
          placeholderTextColor="white"
          onChangeText={(newPassword) => setNewPassword(newPassword)}
        /> 
                <TouchableOpacity
                onPress={handleChangePassword}
                style={styles.changeButton}>
                  <Text style={styles.changeText} >🔄️ Change</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

// define your styles
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // resmi tamamen kaplamak için
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeButton:{
      backgroundColor:'purple',
      padding: 15,
      borderRadius:50
     },
     changeText:{
      color:'#fff',
      letterSpacing:2
     },
    inputView: {
      backgroundColor: 'rgba(128, 0, 128, 0.5)',
      borderRadius: 30,
      width: width/1.3,
      height: 45,
      marginBottom: 20,
       
      alignItems: "center",
      flexDirection:'row',
      paddingLeft: width/4.2,  
    },
    titleChangePassword:{
      fontSize:20,
      marginBottom:30,
      fontFamily:'Helvetica',
      color : '#fff'
    }
});

//make this component available to the app
export default Profile;
