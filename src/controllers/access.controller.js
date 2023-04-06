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
}

module.exports = new AccessController();