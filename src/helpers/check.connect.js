'use strict';
const  mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 1000;

const countConnect = ()=>{
    const numConnections = mongoose.connections.length;
    console.log('numConnections :: ', numConnections);
}

const checkOverLoad = ()=>{
    setInterval(()=>{
        const numConnections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memory = process.memoryUsage().rss
        // Example maximum number of connections based on number of cores
        const maxConnections = numCores * 5
        if(numConnections > maxConnections){
            console.log('connections overload: ')
            console.log(`Active connections: ${numConnections}`)
            console.log(`Memory usage: ${memory / 1024 / 1024} MB`);
        }

    },5 * _SECOND);
}
const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next(err)
        })
    }
}
module.exports = {countConnect,checkOverLoad,asyncHandler}