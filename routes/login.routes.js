import { Router } from "express";
import passport from "passport";
import userModel from "../models/User.js";


const router= Router()

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login', passport.authenticate('login', {failureRedirect:'/loginFail',failureMessage:true, successRedirect:'/productos'}) , async (req, res)=>{
    const user= req.user;
    // console.log(user)
    req.session.user= {
        email: user.email,
        avatar:user.avatar ,
        role: user.role,
        name: user.name,
        last_name: user.last_name
    }
    res.status(200).send({message:'Logueado exitosamente'})
})

router.get('/loginFail', (req, res)=>{
    res.render('loginFail')
})

export default router