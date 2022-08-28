const Category= require('../models/category')
const errorHandler=require(`../helpers/dbErrorHandler`)
const _=require('lodash')
exports.create = (req,res) => {
  //console.log("req.body", req.body);
  const category = new Category(req.body);
  category.save((err, cat) => {
    if (err) {
        return res.status(400).json({
            err:errorHandler(err)
        })
    }
   
    res.json({
        cat
    })
  });
};

exports.CategoryById =(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
      if(err||!category){
        return res.status(400).json({ error:"Category Not found"})
      };

      req.category=category;
      next();
    })
}


exports.read=(req,res)=>{
  return res.status(200).json(req.category)
}

exports.remove=(req,res)=>{
  let Category=req.category
  console.log(req.category);
  Category.remove((err,deleteproduct)=>{
    if(err){
      return res.status(400).json({
        error:errorHandler(err)
      })
    }

    res.json({messgae:'Category deleted successfully'})
  })
}

exports.update=(req,res)=>{
  let Category=req.category
  Category=_.extend(Category,req.body)
  
  Category.save((err,cat)=>{
        if(err){
          return res.status(400).json({error:errorHandler(err)})
        }
        res.json({
          cat,
          message:'Category updated successfully'
        })
  })
}

exports.list=(req,res)=>{
  Category.find().exec((err,list)=>{
    if(err||!list){
      res.status(400).json({error:'No category found'})
    }
    res.status(200).json(list);
  })
}