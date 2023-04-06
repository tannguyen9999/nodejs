'use strict';

const keytokenModel = require("../models/keytoken.model");

class KeyTokenSevice {
    static createKeyToken = async ({userId,publicKey,privateKey,refreshToken=""})=>{
        // const tokens = await keytokenModel.create({
        //     user: userId,
        //     publicKey,
        //     privateKey
        // })
        // return tokens ? tokens.publicKey : null

        // atom method
        const filter = {user:userId},update = {
            publicKey,
            privateKey,
            refreshTokenUsed:[],
            refreshToken
        },options = {new:true,upsert:true}
        const tokens = await keytokenModel.findOneAndUpdate(filter,update,options)
        return tokens ? tokens.publicKey : null
    }
}

module.exports = KeyTokenSevice