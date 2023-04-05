'use strict';

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const RoleShop = {
    SHOP:'Shop',
    WRITER:'WriteR',
    EDITOR:'Editor',
    ADMIN:'Admin',
}

class AccessService {
    static signUp = async({name,email,password}) =>{
        try {
            // su dung lean de giam kich thuoc size object cua mongoose
            const hodelShop = await shopModel.findOne({email}).lean()
            if(hodelShop) {
                return {
                    code:'xxx',
                    message:'Shop already exists',
                }
            }
            const passwordHash = await bcrypt.hash(password,10)

            const newShop = await shopModel.create({
                name,
                email,
                password:passwordHash,
                roles:[RoleShop.SHOP]
            })
            if(newShop) {
                //created privateKey,publicKey
                //privateKey => User => signToken
                //publicKey => Server => VerifyToken
                const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                    modulusLength:4096,
                })
                console.log({privateKey,publicKey})
            }

        } catch (error) {
            return {
                code : 'xxx',
                message:error.message,
                status:'error',
            }
        }
    }
}

module.exports = AccessService