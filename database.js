import {Platform} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// DeviceInfo.getUniqueId()

export let dataUser = {
    id: "unknown",
    balance: 10000,
    cryptos: {
        "Bitcoin": 0, 
        "Ethereum": 0,
        "Shiba-Inu": 0,
        "Solana":0,
        "Tether":0,
        "Cardano":0,
        "Polkadot":0,
        "Dogecoin":0,
        "Terra":0,
        "Avalanche":0,
        "Litecoin":0,
        "Uniswap":0,
        "Polygon":0,
        "Algorand":0,
        "Cosmos":0,
        "Stellar":0,
        "Dai":0,
        "Fantom":0,
        "Elrond":0,
        "Filecoin":0,
        "Olympus":0,
        "Kadena":0,
        "Holo":0,
    }
}

export async function storeUser() {
    if (dataUser.id != "unknown" && dataUser.id != "") {
        try {
            console.log(dataUser)
            const jsonVal = JSON.stringify(dataUser)
            await AsyncStorage.setItem("@" + dataUser.id, jsonVal)
            console.log("STORED!")
        } catch (e) {
            console.log(e)
        }
    }
}

export function showData(name){
    let string = ''
    let upperName = toUpperCrypto(name)

    console.log(dataUser.cryptos[upperName])
    string += dataUser.cryptos[upperName] + " " + upperName +  "\n"
    
    console.log(string)
    return(string)
}

export async function getUser() {
    console.log("GETTING INFO @" + dataUser.id)
    try {
        const value = await AsyncStorage.getItem("@" + dataUser.id)
        console.log(value)
        if(value != null) {
            dataUser = JSON.parse(value)
            console.log("User found! UserID: " + dataUser.id + " Balance: " + dataUser.balance)
            console.log(dataUser)
        } else {
            console.log("User NOT found! UserID: " + dataUser.id)
            console.log("Attempting to create user: " + dataUser.id)
            storeUser()
        }
    } catch(e) {
      // error reading value
    }
}

const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch(e) {
        // clear error
    }

    console.log('Done.')
}

const baseUrl = "https://api.coingecko.com/api/v3/coins/" 

export function getAllCoins() {
    let out = []

    for (let i in dataUser.cryptos) {
        setCoin(i)
        out += currentCoin
    }

    setCoin("bitcoin")

    return out
}

let currentCoin = {
    name: "",
    data: [],
    percent: "",
    price: "",
    img: ""
}
setCoin("Bitcoin")

export function getCurrentCoin() {
    return currentCoin
}

export async function setCoin(name) {
    console.log("setting coin: " + name)
    try {
        const response = await fetch(baseUrl + name.toLowerCase());
        const json = await response.json();
        // console.log(json)
        // set crypto data here!
        currentCoin.data = json
        currentCoin.name = name
        console.log(currentCoin.percent = json.market_data.price_change_percentage_1h_in_currency.usd)
        currentCoin.percent = json.market_data.price_change_percentage_1h_in_currency.usd
        currentCoin.price = json.market_data.current_price.usd
        currentCoin.img = json.image.large
    } catch (error) {
        console.error(error);
    }
}

function toUpperCrypto(coinName) {
    let out = coinName.slice(0,1).toUpperCase() + coinName.slice(1)
    let index = out.indexOf("-")

    if (index != -1) {
        out = out.slice(0, index + 1) + out[index + 1].toUpperCase() + out.slice(index + 2)
    }
    
    return out
}

export function purchase(coin, amt){ //Need to keep user from overpurchasing 
    
    let grandTotal = currentCoin.price*amt
    console.log(currentCoin.price)
    console.log("total "+ grandTotal)
    if(dataUser.balance>=grandTotal){
        setCoin(coin)
        console.log(currentCoin)
        dataUser.cryptos[toUpperCrypto(coin)] += amt
        console.log("coins after purchase: " + dataUser.cryptos[coin])
        
        dataUser.balance -= grandTotal

        storeUser()
        
        console.log("---------PRICE--------\n" + currentCoin.price + "balance: " + dataUser.balance)
        return("You bought " + amt + " " + coin + " for $" + grandTotal)
    }
    else{
        return("You do not have enough money to buy " + amt + " " + coin + " right now.")
    }
}

export function sell(coin, amt){ 
    setCoin(coin)
    console.log("amount of " + coin + dataUser.cryptos[toUpperCrypto(coin)])
    let profit = 0
    let numUserCoins = dataUser.cryptos[toUpperCrypto(coin)]
    console.log("sell amt: " + amt)
    if(numUserCoins >= amt){
        dataUser.cryptos[toUpperCrypto(coin)]-=amt
        profit = currentCoin.price * amt
        console.log("Profit: "+ profit)
        dataUser.balance += profit
        console.log("you sold " + amt + " " + coin + " for $" + profit)

        storeUser()

        return("you sold " + amt + " " + coin + " for $" + profit) 
    }else{
        return("oops! you dont have any of " + coin + " buy some to be able to sell them for profit!")
    }
        
    
    

    console.log(final)
    return ("vballd")
}



// export const storeData = async (value) => {
//     try {
//         await AsyncStorage.setItem('@storage_Key', value)
//     } catch (e) {
//         // saving error
//     }
// }