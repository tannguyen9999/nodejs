"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenSevice = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError } = require("../core/error.response");

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
    });
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
}

module.exports = AccessService;
