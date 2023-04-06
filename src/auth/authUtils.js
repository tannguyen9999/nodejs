'use strict';
const JWT = require('jsonwebtoken');
const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION_KEY: 'authorization',
}
const createTokenPair =  async (payload,publicKey,privateKey)=>{
    try {
        //access token
        const accessToken = await JWT.sign(payload,publicKey,{
            expiresIn:'2 days',
        })

        const refreshToken = await JWT.sign(payload,privateKey,{
            expiresIn:'7 days',
        })
        
        JWT.verify(accessToken, publicKey,(error,decode)=>{
            if(error){
                console.log(error);
            }else{
                // console.log("decode",decode)
            }
        })
        return {refreshToken,accessToken}
        
    } catch (error) {
        
    }
}
const authentication = async

module.exports = { createTokenPair}