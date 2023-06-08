import User from "../models/User";
import bcrypt from "bcryptjs"

export const getAllUser = async(req, res, next) => {
    let users;
    try{
        users = await User.find();
    } catch(err){
        console.log(err);
    }

    if (!users){
        return res.status(404).json({message: "No User Found"});
    }
    return res.status(200).json({users});

};

export const signup = async (req, res, next)=>{
    const {name, email, password} = req.body;

    let exisitngUser;
    try {
        exisitngUser = await User.findOne({email});
    } catch(error){
        return console.log(error);
    }
    if (exisitngUser){
        return res.status(400).json({message: "User already existed! Login insted. "});
    }
    const hashPassword = bcrypt.hashSync(password); 
    const user = new User(
        {
            name,
            email,
            password: hashPassword,
            blogs: [],
        }
    );

    try{
       await user.save();
    }catch(err){
        return console.log(err);
    }

    return res.status(201).json({user});
};

export const login = async(req, res, next) =>{
    const {email, password} = req.body;

    let exisitngUser;
    try {
        exisitngUser = await User.findOne({email});
    } catch(error){
        return console.log(error);
    }
    if (!exisitngUser){
        return res.status(404).json({message: "User not found "});
    }

    const isPasswordCorrect = bcrypt.compare(password, exisitngUser.password);

    if (!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"});
    }

    return res.status(200).json({message:"Login Successfull! "});
};