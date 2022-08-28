const products=require('../models/product')
const erroHandler=require('../helpers/dbErrorHandler')
const {cloudinary} = require("../utils/cloudinary");
const _=require('lodash');


exports.create= async(req,res)=>{
    // console.log("file details: ", req.file);

    // cloudinary.v2.uploader.upload(file, options, callback);
    const result = await cloudinary.uploader.upload(req.file.path, {folder: 'BookStore'})
    const product=new products(req.body)
    product.photo=result.url
    product.photo_pubId=result.public_id
    product.save((err, cat) => {
        if (err) {
            return res.status(400).json({
                err:erroHandler(err)
            })
        }
       
        res.json({
            cat
        })
      });

   
}

exports.productById=(req,res,next,id)=>{
    products.findById(id).exec((err,pro)=>{
        if(err||!pro){
            return res.status(400).json({
                error:'Product not found'
            })
        }


        req.pro=pro;
        next();
    })
}

exports.read=(req,res)=>{
   
    return res.json(req.pro)
}

exports.remove= (req,res)=>{
 let product=req.pro
 product.remove(async(err,deleteProduct)=>{
    if(!err){
        const result = await cloudinary.uploader.destroy(product.photo_pubId) 
    }
    if(err){
        return res.status(400).json({
            error:erroHandler.errorHandler(err)
        })
    }
    
    res.json(
      {  
        "message":"product deleted successfully"
    })
 }) 
}


exports.update= async(req,res)=>{
    // console.log("file details: ", req.file);

    let product =req.pro

    const remove = await cloudinary.uploader.destroy(product.photo_pubId) 

    const result = await cloudinary.uploader.upload(req.file.path, {folder: 'BookStore'})
    product.photo=result.url
    product.photo_pubId=result.public_id

    product=_.extend(product,req.body)

    product.save((err, cat) => {
        if (err) {
            return res.status(400).json({
                err:erroHandler(err)
            })
        }
       
        res.json({
            cat,
            message:'Product Updated successfully'
        })
      });

    
   
}

/**
* sell /arrival
* by sell =/product/list?sortBy=sold&order=desc&limit=4
* by arrival=/product/list?sortBy=createdAt&order=desc&limit=4
*if no params are sent all product are returned
*/

exports.list=(req,res)=>{
    let order=req.query.order?req.query.order:'asc'
    let sortBy=req.query.sortBy?req.query.sortBy:'_id'
    let limit=req.query.limit?parseInt(req.query.limit):6

    products.find()
             .select()
            //  .populate('categories')
             .sort([[sortBy,order]])
             .limit(limit)
             .exec((err,productList)=>{
                if(err){
                    res.status(400).json({error:'product not found'})
                }
                res.status(200).json(productList)
             })
}

/*
* in which the related things are connected with product based on the requset product category
*/
exports.leastRelated=(req,res)=>{
     let limit=req.query.limit?parseInt(req.query.limit):6

     console.log(req.pro.category);

     products.find({_id:{$ne:req.pro},category:req.pro.category})             
             .limit(limit)
                       
             .exec((err,product)=>{
                if(err){
                    res.status(400).json({error:'related data not found'})
                }

                res.status(200).json(product)
             })
}

exports.listCategories=(req,res)=>{
    products.distinct('category',{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                error:'Product Not found'
            })
            
        }
        res.json({categories})
    })
}

/*
* categories in checkbox and price range in radio button
*/

exports.listBySearch=(req,res)=>{
    let order=req.body.order?req.body.order:'desc'
    let sortBy=req.body.sortBy?req.body.sortBy:'_id'
    let limit=req.body.limt?parseInt(req.body.limit):4
    let skip=parseInt(req.body.skip)
    let findArgs={}

    for (let key in req.body.filters){
       
        if(req.body.filters[key].length>0){
            //gte than price -[0-10]
            //lte than price 
            if(key==='price'){
                $gte=req.body.filters[key][0]
                $lte=req.body.filters[key][1]
            }
        }else{
            findArgs[key]=req.body.filters[key]
        }
    }


    console.log(findArgs);
    products.find(findArgs)
             .select()  
            //  .populate('categories') 
            .sort([[sortBy,order]])
            .limit(limit)
            .skip(skip)        
             .exec((err,product)=>{
                if(err){
                    res.status(400).json({error:'ss'})
                }
                res.status(200).json({
                    size:product.length,
                    product
                })
             })
}
