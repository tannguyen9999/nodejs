'use strict';

const mongoose = require('mongoose');
const {db:{host,name,port}} = require('../configs/config.mongodb');
const { countConnect } = require('../helpers/check.connect');
const connectString = `mongodb://${host}:${port}/${name}`
console.log(connectString);
class Database{
    constructor(){
        if(!Database.intance){
            Database.intance = this
            this.connect()
        }else{
            return Database.intance
        }
    }
    connect() {
        if(1 === 2){
            mongoose.set('debug',true)
            mongoose.set('debug',{color:true})
        }
        mongoose.connect(connectString,{
            // la tap hop cac connections co the tai su dung khi co 1 yeu cau moi,
            // giam thieu cost khi phai open/close database, neu co qua nhieu yeu cau cung luc can phai xep hang de dc connect
            maxPoolSize:50,
        }).then(()=>{
            console.log('console connect mongodb success')
            countConnect()
        }).catch(err => {
            console.log(`Error Connect!`)
            console.log(err.message)
        })
    }
    static getIntance() {
        if(!Database.intance){
            Database.intance = new Database()
        }
        return Database.intance
    }
}
const instanceMonoDb = Database.getIntance()
module.exports = instanceMonoDb