//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,Dimensions,TouchableOpacity,Image  } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';
import '@walletconnect/react-native-compat'
import { WagmiConfig, useAccount  } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'
import { W3mButton,W3mAccountButton, useWeb3Modal,useWeb3ModalState  } from '@web3modal/wagmi-react-native'
import { WalletConnectModal,useWalletConnectModal  } from '@walletconnect/modal-react-native'
import WalletInfo from '../../components/WalletInfo';

const { width, height } = Dimensions.get('window');  
const projectId = '44242b87d82900b5a959a2d278be4988'

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
 
const Home = ({navigation}) => {
    const dispatch = useDispatch();
    const { isOpen, open, close, provider, isConnected  } = useWalletConnectModal();
    const {  selectedNetworkId } = useWeb3ModalState()
 
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
           <Text style={styles.walletConnectorText} >WalletConnect🪙r</Text>
            <View style={styles.container}>
             <WagmiConfig config={wagmiConfig}>
       <View>
      
        <WalletInfo/>
 
      <W3mButton label="Connect"/>
       </View>
     <Web3Modal />
      </WagmiConfig>
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
    walletConnectorText:{
      fontSize:30,
      letterSpacing:5,
      paddingTop:100
    }
});

//make this component available to the app
export default Home;
