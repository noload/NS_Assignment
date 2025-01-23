import jwt from "jsonwebtoken"

const generateToken =(userId:number,email:string) => {
    return jwt.sign({userId,email},process.env.JWT_SECRET as string,{expiresIn:"1h"});
}

const verityToken=(token:string) => {
    return jwt.verify(token,process.env.JWT_SECRET as string)
}

export {generateToken,verityToken}