const User = require("../models/user");
const {errorHandler}=require(`../helpers/dbErrorHandler`)
const jwt=require('jsonwebtoken');//to generate signed token

var { expressjwt: jwtauth } = require("express-jwt");//to autherization check

exports.signup = (req, res) => {
  //console.log("req.body", req.body);
  try{
  const user = new User(req.body);
  user.save((err, User) => {
    if (err) {
        return res.status(400).json({
            err:errorHandler(err)
        })
    }
    user.salt=undefined;
    user.hashed_password=undefined;
    res.status(200).json({
        user
    })
  });
}catch(error){
  res.status(500).json({message:'Internal server not found'})
}
};


exports.signin=(req,res)=>{

  //find the user based on the email
  const {email,password}=req.body;
  User.findOne({email},(error,user)=>{
    if(error||!user){
      
      return res.status(400).json({
        error:'User With the email is not found,Please Signup'
      })
    }

    //if user is found make sure the email and password match
    //create authenticate method in user model
    if(!user.authenticate(password)){
      return res.status(401).json({
        error:'Email and Password is dont match'
      });
    }

    //generate a signed token with user id and secert

    const token=jwt.sign({_id:user._id},process.env.JWT_TOKEN)
    const expiry=new Date()*30*24*60*60*1000;
    //persist the token as 'token' in cookie with expiry date
    res.cookie('token',token,{expire:expiry})
    //return response with user and token to frontend client
    const {_id,name,email,role}=user
    return res.json({token,user:{_id,email,name,role}})

  })

};

exports.signout=(req,res)=>{
  res.clearCookie('token');
  res.json({message:"Signout successfully"})
}

exports.requireSignin = jwtauth({
  secret:process.env.JWT_TOKEN,
  algorithms: ["HS256"],
  userProperty:"auth"
});


exports.isAuth=(req,res,next)=>{
  let user =req.profile && req.auth && req.profile._id.toString()===req.auth._id
  // console.log( req.profile._id.toString())
  // console.log(req.auth._id)
if(!user){
  return res.status(403).json({
    error:'Access denied'
  })
}
next();
}


exports.isAdmin=(req,res,next)=>{
  if(req.profile.role===0){
    return res.status(403).json({
      error:'Admin resourse ! Access denied'
    });
  }
  next();
};