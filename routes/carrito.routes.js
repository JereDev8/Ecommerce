import { Router } from "express";
import carritoModel from "../models/Carrito.js";
import productModel from "../models/Productos.js";
import userModel from "../models/User.js";

const router= Router()

// crear un carrito: cuando ponga comprar/agregar al carrito se debe hacer un POST al carrito, y los id para el filter los saco del id del boton
// debo traer el carrito de la db

router.get('/carrito',async (req, res)=>{
    if(!req.session.user) return res.render('NoLog');
    const user= await userModel.findOne({email: req.session.user.email})
    console.log(user.carrito)
    res.render('carrito', {productos: user.carrito ,avatar: req.session.user.avatar})
})

router.post('/carrito', async (req, res)=>{
    console.log(req.body)
}) 

export default router