require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const {default:helmet} = require('helmet')
const compression = require('compression');
const { checkOverLoad } = require('./helpers/check.connect');
const router = require('./routes');

const app = express();

// init middleware

//morgan: log request
app.use(morgan('dev')) //to mau cho trang thai request
// app.use(morgan('combined')) // tieu chuan apache full info request (IP, time, method,status, user agent)
// app.use(morgan('short')) // ngan hon, bao gom thoi gian phan hoi
// app.use(morgan('tiny')) // ngan hon, bao gom thoi gian phan hoi

app.use(helmet()) // tranh tham do header de ko biet su dung cong nghe gi
// nen data de giam luu luong bang thong, co the gay nang server khi nen va nang client de giai ma, nhung neu mang yeu thi khi ket hop vs cac thiet bi co phan cung tot thi ok
app.use(compression()) 

//init db
require('./dbs/init.mongodb')
checkOverLoad()

//init routes
app.use('',router)
//handle errors

module.exports = app