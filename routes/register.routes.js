import { Router } from "express";
import userModel from "../models/User.js";
import uploader from "../services/upload.js";

const router= Router()

router.get('/register',async (req, res)=>{
    res.render('register')
})

router.post('/register',uploader.single('avatar') , async (req, res)=>{
    const file= req.file;
    const {name, last_name, email, password}= req.body;
    if(!name || !last_name || !email || !password) return res.status(400).send({message:'Debes llenar todos los campos'})
    const exist = await userModel.findOne({email})
    if(exist) return res.status(400).send({message: 'Este Email ya esta registrado'})
    userModel.create({name, email, password, avatar: `${req.protocol}://${req.hostname}:${process.env.PORT}/static/img/${file.filename}`});
    res.status(200).send({message:'Usuario Registrado exitosamente'}) 
}) 
 
export default router

