'use strict';
const dev = {
    app:{
        port:process.env.DEV_APP_PORT || 3052
    },
    db:{
        host:process.env.DEV_DB_APP_HOST || 'localhost',
        port:process.env.DEV_DB_APP_PORT || 27018,
        name:process.env.DEV_DB_APP_NAME || 'shopDev',
    }
}
const production = {
    app:{
        port:process.env.PRO_APP_PORT || 3000
    },
    db:{
        host:process.env.PRO_DB_APP_HOST || 'localhost',
        port:process.env.PRO_DB_APP_PORT || 27017,
        name:process.env.PRO_DB_APP_NAME || 'shopPro',
    }
}
const config = {dev, production}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]