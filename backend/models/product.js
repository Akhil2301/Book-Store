const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
         type:String,
         required:true,
         maxlength:2000
    },
    price:{
         type:Number,
         trim:true,
         required:true,
         maxlength:32
    },
    category:{
        type:ObjectId,
        ref:'categories',
        required:true
    },
    quantity:{
        type:Number,
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
         type:String,
         required:true
    },
    photo_pubId:{
        type:String,
        required:true
    },
    shipping:{
        type:Boolean,
        required:false,        
    }
},
{timestamps:true}
);

module.exports= mongoose.model('product',productSchema)
