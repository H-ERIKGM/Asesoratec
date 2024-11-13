import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js';
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const {email, password, name, last_name, phone, role} = req.body;
    try{
        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(["The email already in use"]);
        const passHash = await bcrypt.hash(password, 10);

        const newUser = new User ({
            name,
            last_name,
            email,
            phone,
            password: passHash,
            role,
        });
        const userSaved = await newUser.save();
        const token = await createAccessToken({id:userSaved._id});
        res.cookie('token', token)        
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            last_name: userSaved.last_name,
            email: userSaved.email,
            phone: userSaved.phone,
            role: userSaved.role
        });
    }catch(error){
        console.log(error);
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const userFound = await User.findOne({email});

        if(!userFound) return res.status(400).json({message:"User not found"});

        const passMatch = await bcrypt.compare(password, userFound.password);

        if(!passMatch) return res.status(400).json({message:"Wrong password"});
        
        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token)
        res.json({
            id: userFound._id,
            name: userFound.name,
            last_name: userFound.last_name,
            email: userFound.email,
            phone: userFound.phone,
            role: userFound.role,
        });
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound._id,
        name: userFound.name,
        last_name: userFound.last_name,
        email: userFound.email,
        phone: userFound.phone
    })
}

export const getUsers = async (req, res) => {
    const Users = await User.find({})
    res.json(Users);
};

export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!user) return res.status(404).json({message: 'Subject not found'})
    res.json(user)
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "Unauthorized"});
    
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "Unauthorized"});

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({message: "Unauthorized"});

        return res.json({
            id: userFound._id,
            email: userFound.email,
        })
    })
}