const jwt=require('jsonwebtoken');
const JWT_SECRETKEY="mysecretkey";

const fetchuser=(req,res,next)=>{
    //GET user from jwt token and append user.id to req
    // console.log(req.header('auth-token'),req.header('Content-Type'));
    const token=req.header('auth-token')
    if(!token){
        res.status(401).json({error:"Please authenticate user"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRETKEY);
        req.user=data.user;
        // console.log(data);
        next();
        } catch (error) {
            res.status(401).json({error:"Please authenticate user"})
        }
}

module.exports=fetchuser;