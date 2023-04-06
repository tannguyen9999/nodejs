'use strict';

const { findById } = require("../services/apikey.service");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION_KEY: 'authorization',
}
const apiKey = async (req,res,next)=>{
    const key = req.headers[HEADER.API_KEY]?.toString()
    if(!key) return res.status(403).json({
        message:'Forbidden error: API key'
    })

    const objKey = await findById(key)

    if(!objKey) return res.status(403).json({
        message:'Forbidden error'
    })
    req.objKeys = objKey
    return next()
}

const checkPermission = (permission)=>{
    return (req, res, next) =>{
        if(!req.objKeys.permissions){
            return res.status(403).json({
                message:'permission denied'
            });
        }
        const validationPermissions = req.objKeys.permissions.includes(permission)
        if(!validationPermissions){
            return res.status(403).json({
                message:'permission denied'
            });
        }
        return next()
    }
}


module.exports = {
    apiKey,
    checkPermission,
}