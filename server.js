require('dotenv').config()

const express = require('express')
const app = express()
const Web3 = require('web3')
const { addressProviderABI } = require('./abis')
const { KOVAN_LENDING_POOL_PROVIDER_ADDRESS } = require('./addresses')
const rpcURL = "https://kovan.infura.io/v3/"+process.env.INFURA_KEY
const web3 = new Web3(rpcURL)
const address = "0x9Db0c155cd02a95f1F23Aa863d1c18B000EfbF89"


app.listen(3000, () => console.log('Server Started'))

app.get("/", (req, res) => {
    web3.eth.getBalance(address, async (err, wei) => {
        balance = web3.utils.fromWei(wei, 'ether')
        console.log(addressProviderABI)
        // res.send(addressProviderABI)
        const providerInstance = new web3.eth.Contract(addressProviderABI, KOVAN_LENDING_POOL_PROVIDER_ADDRESS)
        const lendingPoolAddress = await providerInstance.methods.getLendingPool().call()
        .catch((e) => {
            throw Error(`Error getting lendingPool address: ${e.message}`)
        });

        const response = {
            bal: balance,
            address: lendingPoolAddress
        }
        res.send(response)
    })
})