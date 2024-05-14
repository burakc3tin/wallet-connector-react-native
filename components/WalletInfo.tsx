//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useBalance } from 'wagmi'
import { getBalance } from '@wagmi/core'
import Balance from './Balance';
 // create a component

 
const WalletInfo = () => {
    const { address } = useAccount()
  
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
            <Text style={styles.addressText}>  Adress</Text>
            <Text style={styles.addressText}> {address}</Text>
            </View>
             <Balance adress={address}/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
       alignItems: 'center',
      justifyContent: 'center',
      elevation: 55, 

    },
    subContainer:{
        alignItems:'center',
        backgroundColor:'#FFAF61',
        borderRadius:50,
        elevation: 55, 
        padding:20,
        textAlign:'center'
    },
    addressText:{
        fontSize:16
    }
  });
export default WalletInfo;
