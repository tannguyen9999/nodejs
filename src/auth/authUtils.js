"use strict";
const JWT = require("jsonwebtoken");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { asyncHandler } = require("../helpers/check.connect");
const { findByUserId } = require("../services/keyToken.service");
const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION_KEY: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    //access token
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.log(error);
      } else {
        // console.log("decode",decode)
      }
    });
    return { refreshToken, accessToken };
  } catch (error) {}
};
const authentication = asyncHandler(async (req, res, next) => {
  // check userId missing
  // get access token
  // verify token
  // check user in dbs
  // check keyStore with userId
  // return next()
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new BadRequestError("userId not specified");

  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("not found keyStore");
  const accessToken = req.headers[HEADER.AUTHORIZATION_KEY];
  if (!accessToken) throw new BadRequestError("INVALID_ACCESS_TOKEN");

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId) {
      throw new BadRequestError("Invalid user");
    }
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

const authenticationV2 = asyncHandler(async (req, res, next) => {
  // check userId missing
  // get access token
  // verify token
  // check user in dbs
  // check keyStore with userId
  // return next()
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new BadRequestError("userId not specified");

  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("not found keyStore");

  if (req.headers[HEADER.REFRESHTOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESHTOKEN];
      const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
      if (userId !== decodeUser.userId) {
        throw new BadRequestError("invalid refresh token");
      }
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      throw error;
    }
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION_KEY];
  if (!accessToken) throw new BadRequestError("INVALID_ACCESS_TOKEN");

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId) {
      throw new BadRequestError("Invalid user");
    }
    req.keyStore = keyStore;
    req.user = decodeUser;
    return next();
  } catch (error) {
    throw error;
  }
});

const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
};

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
  authenticationV2,
};
