//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import '@walletconnect/react-native-compat'
import { WagmiConfig } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'
import { W3mButton,W3mAccountButton } from '@web3modal/wagmi-react-native'
import Login from './screens/Login';
import Register from './screens/Register';
import Navigator from './screens/Navigator';

import { store } from './redux/store'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const projectId = '44242b87d82900b5a959a2d278be4988'
const Stack = createNativeStackNavigator();

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

const chains = [mainnet, polygon, arbitrum]
 const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const App = () => {
  return (
    // <WagmiConfig config={wagmiConfig}>
    //  <View>
    //  <W3mButton balance='show' />
    
    //  </View>
    //   <Web3Modal />
    // </WagmiConfig>
    <NavigationContainer>
    <Provider store={store}>

 
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}  />
        <Stack.Screen name="Navigator" component={Navigator} options={{ headerShown: false }}  />

      </Stack.Navigator>
   
    </Provider>
    </NavigationContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
