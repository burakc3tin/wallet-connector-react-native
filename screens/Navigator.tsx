import React, {useEffect, useState} from 'react';
import { TouchableOpacity,Text, Dimensions, Image,Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Tabs/Home';
import Profile from './Tabs/Profile';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { logoutUser } from "../redux/userSlice";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');  

 

export default function Navigator({navigation}) {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState('');
  
 
  
 
  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      navigation.navigate('Login');
    } catch (error) {
      console.error("Logout dispatch error:", error);
     
    }
  };

  return (
    <Tab.Navigator
   
      screenOptions={{
        tabBarActiveBackgroundColor: '#E6CEF5', // Aktif tab arka plan rengi
        headerShown:false,
        headerTitle: '',
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout}>
             <Image
        source={require('../assets/images/quit.png')}
        style={{
          width: width/14.4, // Yüzde yüz genişlik
          height: height/30, // Ekran yüksekliğinin 1/4'ü kadar yükseklik
         marginRight:10
        }}
        resizeMode="cover" // Resmi kırpma olmadan görüntüle
      />
           </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen name="Home" component={Home}  options={{
        tabBarShowLabel:false,
          tabBarIcon: ({ color, size }) => (
            <Image
        source={require('../assets/images/crypto.png')}
        style={{
          width: width/14.4, // Yüzde yüz genişlik
          height: height/30, // Ekran yüksekliğinin 1/4'ü kadar yükseklik
         marginRight:10
        }}
        resizeMode="cover" // Resmi kırpma olmadan görüntüle
      />
          ),
        }} />
        <Tab.Screen name="Profile" component={Profile}  options={{
        tabBarShowLabel:false,
          tabBarIcon: ({ color, size }) => (
            <Image
        source={require('../assets/images/profile.png')}
        style={{
          width: width/14.4, // Yüzde yüz genişlik
          height: height/30, // Ekran yüksekliğinin 1/4'ü kadar yükseklik
         marginRight:10
        }}
        resizeMode="cover" // Resmi kırpma olmadan görüntüle
      />
          ),
        }} />
     </Tab.Navigator>
  );
}
