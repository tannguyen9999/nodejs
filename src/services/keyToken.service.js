'use strict';

const keytokenModel = require("../models/keytoken.model");
const {Types} = require("mongoose")
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
    static findByUserId = async (userId)=>{
        return await keytokenModel.findOne({user:new Types.ObjectId(userId)})
    }
    static removeKeyById = async (id)=>{
        return await keytokenModel.deleteOne({_id:id})
    }
    static findByRefreshTokenUsed = async (refreshToken)=>{
        return await keytokenModel.findOne({refreshTokenUsed:refreshToken})
    }
    static findByRefreshToken = async (refreshToken)=>{
        return await keytokenModel.findOne({refreshToken})
    }
    static deleteKeyById = async (userId) => {
        return await keytokenModel.deleteOne({user:userId})
    }
}

module.exports = KeyTokenSevice