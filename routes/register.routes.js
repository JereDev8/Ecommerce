import { Router } from "express";
import userModel from "../models/User.js";
import uploader from "../services/upload.js";
import { transporter } from "./email.routes.js";
import bcrypt from "bcrypt"


const router= Router()

const alternativaAvatar= 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png'

router.get('/register',async (req, res)=>{
    res.render('register')
})



router.post('/register',uploader.single('avatar') , async (req, res)=>{
    const file= req.file;
    const {name, last_name, email, password}= req.body;
    if(!name || !last_name || !email || !password) return res.status(400).send({message:'Debes llenar todos los campos'})
    const exist = await userModel.findOne({email})
    if(exist) return res.status(400).send({message: 'Este Email ya esta registrado'})
    const passwordHashed = await bcrypt.hash(password, 10)
    userModel.create({name, email, password: passwordHashed, avatar: req.file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/static/img/${file.filename}`: alternativaAvatar});
    res.status(200).send({message:'Usuario Registrado exitosamente'});
    const result= await transporter.sendMail({
        from:'quinterosjeremias8@gmail.com',
        to:'jeremias8quinteros@gmail.com',
        subject:'Nuevo usuario registrado',
        html: `<div> <h1> Aqui sus datos </h1> </div>
                    <div>
                        <ul>
                            <li> Nombre: ${name} </li>
                            <li> Email: ${email} </li> 
                        </ul>
                    </div> `
    })
}) 
 
export default router

