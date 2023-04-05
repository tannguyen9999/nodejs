'use strict';
const {model,Schema,Types} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops'

// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name:{
        type:Schema.Types.String,
        trim:true,
        maxLength:150
    },
    email:{
        type:Schema.Types.String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:Schema.Types.String,
        required:true,
    },
    status:{
        type:Schema.Types.String,
        enum:['active', 'inactive'],
        default:'inactive'
    },
    verify:{
        type: Schema.Types.Boolean,
        default:false,
    },
    role:{
        type:Schema.Types.Array,
        default:[],
    }
},{
    timestamps:true,
    collection:COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);