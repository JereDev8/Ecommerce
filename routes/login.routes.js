import { Router } from "express";
import userModel from "../models/User.js";


const router= Router()

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login',async (req, res)=>{
    const {email, password}= req.body;
    if(!email || !password) return res.status(400).send({message:'Debes completar todos los campos'})
    const exist= await userModel.findOne({email});
    // console.log(exist)
    if(!exist) return res.status(400).send({message:'Este email no esta registrado'})
    if(exist.password != password) return res.status(400).send({message:'La contraseña no es valida'})
    req.session.user= {
        email,
        avatar:exist.avatar ,
        role: exist.role,
        name: exist.name,
        last_name: exist.last_name,
        // avatar: exist.avatar
    }
    return res.status(200).send({message:'Logueado exitosamente'})
})

export default router