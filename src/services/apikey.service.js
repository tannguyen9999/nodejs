const apikeyModel = require("../models/apikey.model")
const crypto = require("crypto")

const findById = async (key)=>{
    // const a = crypto.randomBytes(64).toString('hex')
    // const newKey = await apikeyModel.create({key:a,status:false,permissions:['0000']})
    // console.log(newKey)
    const objKey = await apikeyModel.findOne({key,status:true}).lean()
    return objKey
}

module.exports = {
    findById
}