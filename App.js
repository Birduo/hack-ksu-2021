import React, {useState, useEffect, Component, setState} from 'react';
import {Button,TextInput, Platform, StyleSheet, Text, View , AppState, Image, useColorScheme } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import * as Device from 'expo-device';

// For nav bar
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useTheme } from '@react-navigation/native';

import {purchase, dataUser, setCoin, sell, getCurrentCoin, getUser, showData, storeUser} from './database' // IMPORTANT

const NewDark = {
  dark: true,
  colors: {
    primary: '#2fff2f',
    background: '#3b3b38',
    card: '#282828',
    text: 'whitesmoke',
    border: '#282828',
    notification: 'rgb(255, 69, 58)', 
  }
}

const NewLight = {
  dark: false,
  colors: {
    primary: '#2fff2f',
    background: 'whitesmoke',
    card: 'white',
    text: '#212121',
    border: '#f0f0f0',
    notification: 'rgb(255, 69, 58)', 
  }
}
///Buy/Sell Screen
console.log(getCurrentCoin())
function BuySellScreen() {
  const [crypto, setCrypto] = useState("Bitcoin")
  const [text, setText] = useState('');
  const [isChanged, setIsChanged] = useState(false)
  const {colors} = useTheme()
  const [receipt, setReceipt] = useState("")
  const [transactionCount, setTransactionCount] = useState(0)

  useEffect(() => {
    
  }, [])
  
return (
  <View style={{alignItems:'center',
    colors: colors.text,
    backgroundColor: colors.background
  }}>
    <Text style={{fontSize:50,color: colors.text ,textAlign:'center', alignItems:'center'}}>
      Current Balance: ${Math.round(dataUser.balance * 100) / 100}
    </Text>
      
    <RNPickerSelect style={{textAlign:'center', color: colors.background, backgroundColor: colors.text,}}
      placeholder={{}}
      onValueChange={(value) => {
        setTransactionCount(transactionCount)
        name = value
        setCoin(value)
        setIsChanged(true)
        showData(name)
        console.log()
      }}    
      
      items={[
        { label: "Bitcoin", value: 'bitcoin'},
        { label: "Ethereum", value: 'ethereum' },
        { label: "Shiba Inu", value: 'shiba-inu' },
        { label: "Solana", value: 'solana' },
        { label: "Tether", value: 'tether' },
        { label: "Cardano", value: 'cardano' },
        { label: "Polkadot", value: 'polkadot' },
        { label: "Dogecoin", value: 'dogecoin' },
        { label: "Terra", value: 'terra' },
        { label: "Avalanche", value: 'avalanche' },
        { label: "Litecoin", value: 'litecoin' },
        { label: "Uniswap", value: 'uniswap' },
        { label: "Polygon", value: 'polygon' },
        { label: "Algorand", value: 'algorand' },
        { label: "Cosmos", value: 'cosmos' },
        { label: "Stellar", value: 'stellar' },
        { label: "Dai", value: 'dai' },
        { label: "Fantom", value: 'fantom' },
        { label: "Elrond", value: 'elrond' },
        { label: "Filecoin", value: 'filecoin' },
        { label: "Olympus", value: 'olympus' },
        { label: "Kadena", value: 'kadena' },
        { label: "Holo", value: 'holo' },
      ]}
    />
    <Text>{"\n"}</Text>
    <View style={{
      color: colors.text,
      backgroundColor: colors.background
    }}>
    <TextInput style={{backgroundColor: colors.text,height:50,width:400,color: colors.background, textAlign:'center',
      alignContent:'center',placeholderTextColor: colors.background}}
      placeholder="How much would you like to buy/sell? (enter a number)"
      onChangeText={text => setText(parseFloat(text))}
      keyboardType="numeric"
      defaultValue={(text)}
    />
    <Text>{"\n"}</Text>
    <View style={{ textAlign:'center', alignItems:'center'}}>
    <Button 
      onPress={() => {
        if (!isChanged) {
          setCrypto("bitcoin")
          setIsChanged(true)
        }   
        console.log(name)
        let r = purchase(name, text)
        setTransactionCount(transactionCount + 1)
        setReceipt(r)
        console.log(r)
      }}
      title="Buy"
      color="#00FF00"
      backgroundColor='colors.backgroundColor'
      accessibilityLabel="Buy"
    />
    <Text>{"\n"}</Text>
    <Button
      onPress={() => {
        if(!isChanged) {
          setCrypto("bitcoin")
          setCoin(name)
          setIsChanged(true)
        }

        let r = sell(name,text)
        setTransactionCount(transactionCount + 1)
        setReceipt(r)
        console.log("crypto is: " + name)
      }}
      title="Sell"
      color="#212121"
      backgroundColor="#000000"
      accessibilityLabel="Sell"
    />
    </View>
  </View>     
  <Text>{"\n"}</Text>
  <Text style={{color: colors.text}}>{receipt}</Text>
  <Text>{"\n"}</Text>
  <Text style={{textAlign:'center'}}>You have {showData(crypto)}</Text>
</View>
);  
}

  ///Settings Screen
function SettingsScreen() {
  const {colors} = useTheme()
  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [updateCount, setUpdateCount] = useState(0)

  useEffect(() => {

  }, [])

  if (true) {
    return (
      <View style={{
        color: colors.text,
        backgroundColor: colors.background,
        textAlign:'center', alignItems:'center'
      }}>
        <Text style={{fontSize:50,color: colors.text ,textAlign:'center', alignItems:'center'}}>
          Sign In
        </Text>
        <TextInput style={{backgroundColor: colors.text,height:50,width:400,color: colors.background, textAlign:'center',
          alignContent:'center',placeholderTextColor: colors.background}}
          placeholder="Enter a user ID to load!"
          onChangeText={text => {
            setText(text)
          }}
        />

        <Text>{"\n"}</Text>
        <Button 
          onPress={() => {
            if (text != "") {
              dataUser.id = text
              getUser().then(() => {
                setUpdateCount(updateCount + 1)
              })
              setSubmitted(true)
            }
          }}
          title="Submit"
          color="#00ff00"
          backgroundColor='#00ff00'
          accessibilityLabel="Buy"
        />
        <Text style={{fontSize:30,color: colors.text ,textAlign:'center', alignItems:'center'}}>
          {(submitted) ? `Successfully connected to: ${text}!\n\n\n$${dataUser.balance}` : ""}
        </Text>
      </View>
    )
  }
}

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();

  function setTheme() {
    if (scheme == "dark") {
      return NewDark
    } else {
      if (Device.brand == "Apple")
        return NewDark
      return NewLight
    }
  }

  function handleAppStateChange(nextAppState) {
    if (nextAppState == 'inactive') {
      console.log("the app is inactive!")
      storeUser()
    } else if (nextAppState == 'background') {
      console.log("the app is in the background!")
      storeUser()
    }
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [])

  return (
    <NavigationContainer theme={setTheme()}>
      <Tab.Navigator>
        <Tab.Screen name="Buy/Sell" component={BuySellScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tinyImg: {
    width: 50,
    height: 50,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})