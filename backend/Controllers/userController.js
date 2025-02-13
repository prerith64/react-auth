import userModel from '../Models/userSchema.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateTokens=(user)=>{
 const  accessToken=jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
 const  refreshToken=jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'});
   return {accessToken,refreshToken };

}

export const logIn=async(req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email});
    if(!user  || ! await bcrypt.compare(password,user.password) ) return res.json(401).json({message:"Invalid Credentials"})
   
    const {accessToken,refreshToken} = await generateTokens(user);
    res.cookie("refreshToken",refreshToken, {
      httpOnly: true,
      secure: false, // Change to true in production (HTTPS)
      sameSite: "Lax",
    });
    
    res.json({accessToken})
}

export const logOut=async(req,res)=>{
    res.clearCookie("refreshToken");
    res.status(201).json({message:"Logged out successfully"})
}

export const getRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token Expired" });

    // Fetch user from DB
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(403).json({ message: "User not found" });

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Set new refresh token in cookies
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, // Change to true in production (HTTPS)
      sameSite: "Lax",
    });
    
    res.json({ accessToken });
  });
};

export const signUp=async(req,res)=>{
    const {username,email,password,confirmPassword}=req.body;
     
    if(await userModel.findOne({email})) res.status(400).json({message:"user already Exist"})

    if(password !== confirmPassword) return res.status(401).json({message:"password is incorrect"})
    
     const hashedPassword=await bcrypt.hash(password,10);
     const user = new userModel(
        {
           username,
           email,
           password:hashedPassword
        }
     )    
    await  user.save();
   
    res.status(201).json({message:"user registered successfully"})

}

export const addText=async (req,res)=>{
    const user = await userModel.findById(req.user.id)
      user.texts.push(req.body.text);
    await user.save()
      res.json({message:"text saved successfully",texts:user.texts});

}

export const getText=async(req,res)=>{
    const user = await userModel.findById(req.user.id)
    res.json({texts:user.texts})
}


export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token Expired" });
      req.user = user;
      next();
    });
  };
  


// const generateTokens=async(user)=>{
//     const accessToken= await jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
//     const refreshToken= await jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'})
//     return {accessToken,refreshToken}
//     }


// const authMiddleware=(req,res,next)=>{
//     const token = req.header("Authorization")?.split(" ")[1];
//     if(!token)  return res.status(401).json({ message: "Access Denied" });
    
//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//         if(err) return res.status(403).json({ message: "Token Expired" });
//         req.user=user
//         next()
//     })
// }



// export const signUp=async(req,res)=>{
//     const {username,email,password,confirmPassword}=req.body;
    
//     if(await userModel.findOne({email})) return res.status(400).json({message:"user already exists"});

//     if(password !== confirmPassword) return res.status(401).json({message:"password is incorrect"})
    
//     const hashedPassword =await brypt.hash(password,10);
//     const user = new userModel({
//         username,
//         email,
//         password:hashedPassword
//     })

//     await user.save()
    
//     res.status(201).json({message:"user registered successfully"})
// }

// export const logIn=async(req,res)=>{
//     const {email,password}=req.body;
//     const user = await userModel.findOne({email})
//     if(!user || !(await brypt.compare(password,user.password) ))
//         return res.status(400).json({message:"invalid credentials"});
    
//     const {accessToken,refreshToken}= await generateTokens(user);

//     res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:true,sameSite:"Strict"})
//     res.status(200).json({accessToken})
    
// }

// export const logOut=async(req,res)=>{
//     res.clearCookie("refreshToken");
//     res.json({message:"Logged out successfully"})
// }


// export const addText=async(req,res)=>{
//     const user = await userModel.findById(req.user.id)
//     user.texts.push(req.body.text);
//     await user.save()
//     res.json({message:"text saved successfully",texts:user.texts});
// }

// export const getText=async(req,res)=>{
//     const user = await userModel.findById(req.user.id);
//     res.json({texts:user.texts})
// }



