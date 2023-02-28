import { Router } from "express";
import userModel from "../models/User.js";


const router= Router()

router.get('/register', (req, res)=>{
    res.render('register')
})

router.post('/register', async (req, res)=>{
    const {name, last_name, email, password}= req.body 
    const exist= await userModel.findOne({email: email})
    if(exist) return res.status(400).send({status: 'Error', message:'El Email ingresado ya esta registrado'})
    await userModel.create({name, last_name, email, password})
    res.send({message:'User created succesfully'})

}) 
 
export default router

// vamos con el req.session.user