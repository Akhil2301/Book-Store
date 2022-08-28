const User=require('../models/user')

exports.userById=(req,res,next,id)=>{
        User.findById(id).exec((err,user)=>{
            if(err||!user){
                return res.status(400).json({
                    error:'user not found'
                });
            }
            req.profile=user;
            next();
        })   
}
exports.read=(req,res)=>{
    req.profile.hashed_password=undefined;
    req.profile.salt=undefined;
    res.status(200).json(req.profile)

}

exports.update=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true},
        (err,user)=>{
            if(err){
               return res.status(400).json({error:"You are not authorized to perform this action"})
            }
            res.status(200).json(user)
        }
        )
}
