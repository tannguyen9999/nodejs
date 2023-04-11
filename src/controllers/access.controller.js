'use strict';

const { CREATED, OK } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    signUp = async (req,res,next) =>{
        new CREATED({
            message:'register successfully',
            metadata : await AccessService.signUp(req.body)
        }).send(res);
    }
    login = async (req,res,next) =>{
        const data = await AccessService.login(req.body)
        new OK(
            {
                metadata: data
            }
        ).send(res)
    }
    logout = async (req,res,next) =>{
        const data = await AccessService.logout(req.keyStore)
        new OK(
            {
                message: "logout successfully",
                metadata: data
            }
        ).send(res)
    }
    handleRefreshToken = async (req, res,next) => {
        // const data = await AccessService.handleRefreshToken(req.body.refreshToken)
        //version 2 fixed
        const data = await AccessService.handleRefreshTokenV2({
            refreshToken:req.refreshToken,
            user:req.user,
            keyStore:req.keyStore
        })
        
        new OK(
            {
                message: "Get token successfully",
                metadata: data
            }
        ).send(res)
    }
}

module.exports = new AccessController();