import { Router } from "express";
import productModel from "../models/Productos.js";
import ProductosDB from '../DAOs/productosDB.js'
import userModel from "../models/User.js";

const productosdb= new ProductosDB()

const router= Router()

router.get('/', (req, res)=>{
    if(!req.session.user) return res.render('inicio')
    res.render('inicio',{avatar: req.session.user.avatar});
    
    
})

router.get('/productos',async (req, res)=>{
    if(!req.session.user){
        const productos= await productModel.find({}).lean();
        return res.render('productos', {productos})
    } 
    const productos= await productModel.find({}).lean()
    const sessOn= []
    res.render('productos', {productos, avatar:req.session.user.avatar, sessOn})
})

router.delete('/productos/:id', async (req, res)=>{
    const deleted= await productosdb.deleteProduct(req.params.id)
    res.send(deleted.toString())
})
 
router.get('/vender', (req, res)=>{
    if(!req.session.user)return res.render('NoLog');
    return res.render('newProduct', {avatar: req.session.user.avatar})
})

router.post('/vender', async (req, res)=>{
    const {name, price, thumbnail}= req.body
    if(!price || !name || !thumbnail) res.send('Debes llenar todos los campos')
    else await productosdb.createProduct({name, price, thumbnail})
})

router.put('/productos/:id',async (req, res)=>{
    await productosdb.updateProduct(req.params.id, req.body)
    const found= await productModel.find({_id: req.params.id})
    res.send(found)
})

router.post('/productos', async (req, res)=>{
    if(!req.session.user) return res.status(400).send({status:'Error', message: 'Debes estar logueado para agregar productos al carrito'})
    const { id }= req.body;
    const producto= await productModel.findOne({_id:id});
    const user= await userModel.findOne({email: req.session.user.email});
    // console.log(user.carrito)
    await userModel.updateOne({email: req.session.user.email}, {$push:{'carrito':producto}});
})


export default router




