import { Router } from "express";
import carritoModel from "../models/Carrito.js";
import productModel from "../models/Productos.js";
import userModel from "../models/User.js";

const router= Router()

// crear un carrito: cuando ponga comprar/agregar al carrito se debe hacer un POST al carrito, y los id para el filter los saco del id del boton
// debo traer el carrito de la db

router.get('/cart',async (req, res)=>{ 
    if(!req.session.user) return res.render('NoLog');
    const user= await userModel.findOne({email: req.session.user.email})
    if(user.carrito.length == 0) return res.render('carrito', {avatar: req.session.user.avatar})
    let total = 0;
    user.carrito.forEach((prod, index)=> total = total + prod.price); 
    res.render('carrito', {productos: user.carrito ,avatar: req.session.user.avatar, total: total}) 
})

router.post('/cart', async (req, res)=>{
    const user = await userModel.findOne({email: req.session.user.email})
    let carro = user.carrito;
    let indexProd = carro.findIndex((prod)=> prod._id == req.body.id);
    carro.splice(indexProd, 1)
    await userModel.updateOne({email: req.session.user.email}, {carrito: carro});
    let usr= await userModel.findOne({email:req.session.user.email});
    req.session.user.carrito = usr.carrito
}) 

router.post('/comprandoCarrito', async (req, res)=>{
    res.redirect('/comprandoCarrito', )
})

router.get('/comprandoCarrito', async (req, res)=>{
    const user = await userModel.findOne({email: req.session.user.email})
    const carritoUser = user.carrito;
    let total = 0;
    carritoUser.forEach((prod, index)=> total = total + prod.price);
    res.render('comprandoCarrito', {carrito: carritoUser, total, avatar: req.session.user.avatar})
})

export default router





// console.log(carro)
// await userModel.updateOne({_id:req.session.user.id}, {carrito:carro});
// let verCarro = await userModel.findOne({_id:req.session.user.id}).lean() 
// console.log(verCarro);