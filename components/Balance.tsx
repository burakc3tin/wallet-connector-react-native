//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useBalance } from 'wagmi'

// create a component
const Balance = ({ adress }) => {
  const [ethPrice, setEthPrice] = useState(null);
  const [ethResult, setEthResult] = useState(null);
  const result = useBalance({
    address: adress,
  })
  const value = result && typeof result === 'object' && result.data && typeof result.data === 'object' && result.data.value !== undefined && `${result.data.value} ${result.data.symbol}`;

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch(
          'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
        );
        const data = await response.json();
        setEthPrice(data.USD);
      } catch (error) {
        console.error('Error fetching ETH price:', error);
      }
    };
  
    const calculateEthResult = () => {
      if (value && ethPrice !== null) {
        setEthResult(parseFloat(value) * ethPrice);
      }
    };
  
    fetchEthPrice();
    calculateEthResult();
  }, [value, ethPrice]);


  return (
    <View style={styles.container} >
      <Text style={styles.ethText}> {value}</Text>
      <Text style={styles.usdText}> {ethResult} USD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1AFD1',
    marginTop: 10,
    elevation: 35, 
    alignItems: 'center',
    borderRadius: 50,
    padding: 30
  },
  balanceText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#663399', // Açık mor
    marginBottom: 10,
    
  },
  resultText: {
    fontSize: 18,
    color: '#FFA500', // Turuncu
  },
  ethText:{
    fontSize:30,
    fontStyle:'bold',
    letterSpacing:1
  },
  usdText:{fontSize:16,
    fontStyle:'italic',
   
  }
});
export default Balance;
