
exports.userSignupValidator=(req,res,next)=>{
    req.check('name','Name is required')
       .isLength({min:1})
    req.check('email','Email must be 3 to 32 characters')
        .matches(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)
        .withMessage('Email must contain @')
        .isLength({
            min:4,
            max:32
        });
    req.check('password','Password is required')
       .isLength({min:1})
    req.check('password')
    .isLength({min:6}) 
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage(`Password must contain a number`)

    const errors=req.validationErrors();
    if(errors){
        const firstError=errors.map(error=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    next();
};

exports.productValidator=(req,res,next)=>{
    req.check('name','Name is required')
        .isLength({min:1})
    req.check('description','Entere the description') 
        .isLength({min:1})   
    req.check('price','Enter the price')
       .matches(/[0-9]/)
    req.check('category','Enter the Category')
       .matches({min:1})
    req.check('quantity','Enter the quantity') 
       .matches(/[0-9]/)
     
        const errors=req.validationErrors();
        if(errors){
            const firstError=errors.map(error=>error.msg)[0]
            return res.status(400).json({error:firstError})
        }
        next();
}


exports.categoryValidator=(req,res,next)=>{
    req.check('name','Name is required')
    .isLength({min:1})

    const errors=req.validationErrors();
    if(errors){
        const firstError=errors.map(error=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    next();
}