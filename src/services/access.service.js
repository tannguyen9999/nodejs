"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenSevice = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError, FORBIDDENERROR } = require("../core/error.response");
const findByEmail = require("./shop.service");
const { removeKeyById, findByRefreshTokenUsed, deleteKeyById, findByRefreshToken } = require("./keyToken.service");

const RoleShop = {
  SHOP: "Shop",
  WRITER: "WriteR",
  EDITOR: "Editor",
  ADMIN: "Admin",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    // console.log(a)
    // su dung lean de giam kich thuoc size object cua mongoose
    const hodelShop = await shopModel.findOne({ email }).lean();
    if (hodelShop) {
      throw new BadRequestError("Shop already registered");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    })
    if (newShop) {
      //created privateKey,publicKey
      //privateKey => User => signToken
      //publicKey => Server => VerifyToken
      // const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
      //     modulusLength:4096,
      //     publicKeyEncoding:{
      //         type:"pkcs1",
      //         format:"pem"
      //     },
      //     privateKeyEncoding:{
      //         type:"pkcs1",
      //         format:"pem"
      //     }
      // })
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await KeyTokenSevice.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        return {
          code: "xxx",
          message: "publicKey error",
        };
      }

      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );
      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }

    return {
      code: 200,
      metadata: null,
    };
  };
  static login = async({email,password,refreshToken})=>{
    
    
    
    // generate tokens
    // get data return login

    // check email in dbs
    const foundShop = await findByEmail({email})
    if (!foundShop) {
      throw new BadRequestError('shop not registered');
    }

    // match password
    const match = bcrypt.compare(password,foundShop.password)
    if(!match) throw new BadRequestError("Authentication failed")

    // create AT vs RT and save
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      publicKey,
      privateKey
    );
    await KeyTokenSevice.createKeyToken({
      userId: foundShop._id,
      publicKey,
      privateKey,
      refreshToken:tokens.refreshToken
    });
    return {
      shop: getInfoData({
        fields: ["_id", "name", "email"],
        object: foundShop,
      }),
      tokens
    }
     
  }
  static logout = async (keyStore)=>{
    return  await removeKeyById(keyStore._id)
  }
  // static handleRefreshToken = async (refreshToken)=>{
  //   const foundToken = await findByRefreshTokenUsed(refreshToken)
  //   if (foundToken){
  //     const {userId,email} = await verifyJWT(refreshToken,foundToken.privateKey)
  //     await deleteKeyById(userId)
  //     throw new FORBIDDENERROR("Something went wrong !! pls relogin")
  
  //   }
  //   const holderToken = await findByRefreshToken(refreshToken)
  //   if(!holderToken){
  //     throw new BadRequestError("Shop not found")
  //   }
  //   const {userId,email} = await verifyJWT(refreshToken,holderToken.privateKey)
  
  //   const foundShop = await findByEmail({email})
  //   if (!foundShop){
  //     throw new BadRequestError("Shop not found")
  //   }
  //   const tokens = await createTokenPair({
  //     userId,
  //     email
  //   },holderToken.publicKey,holderToken.privateKey)

  // //update token
  //   await holderToken.updateOne({
  //     $set:{
  //       refreshToken:tokens.refreshToken,
  //     },
  //     $addToSet:{
  //       refreshTokenUsed: refreshToken // da dc su dung de lay token moi
  //     }
  //   })
  //   return {
  //     userId:{userId,email},
  //     tokens,
  //   }
  // }

  static handleRefreshTokenV2 = async ({
    refreshToken,
    user,
    keyStore
})=>{
    const {userId,email} = user
    if(keyStore.refreshTokenUsed.includes(refreshToken)){
      await deleteKeyById(userId) 
      throw new FORBIDDENERROR("Something went wrong !! pls relogin")
    }
    if(keyStore.refreshToken !== refreshToken){
      throw new BadRequestError("Shop not found")
    }
  
    const foundShop = await findByEmail({email})
    if (!foundShop){
      throw new BadRequestError("Shop not found")
    }
    const tokens = await createTokenPair({
      userId,
      email
    },keyStore.publicKey,keyStore.privateKey)

  //update token
    await keyStore.updateOne({
      $set:{
        refreshToken:tokens.refreshToken,
      },
      $addToSet:{
        refreshTokenUsed: refreshToken // da dc su dung de lay token moi
      }
    })
    return {
      user,
      tokens,
    }
  }
}

module.exports = AccessService;
