const ABI = require('ethereumjs-abi')
const keys = require('../keys')
// genera el hash previo a la firma 
let hashPayment = async(req, res, next) => {
    const { recipient, amount,  nonce, defaultAccount} = req.body
    const contractAddress = keys.contractAddress
    let hash = "0x" + ABI.soliditySHA3(
        ["address","uint256","uint256","address"], [recipient, amount, nonce, contractAddress]
    ).toString("hex")

    req.body.hash = hash
    req.body.contractAddress = contractAddress
    return next()
}

module.exports = hashPayment