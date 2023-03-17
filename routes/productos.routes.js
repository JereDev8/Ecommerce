import { Router } from "express";
import productModel from "../models/Productos.js";
import ProductosDB from '../DAOs/productosDB.js'

const productosdb= new ProductosDB()

const router= Router()

router.get('/', (req, res)=>{
    res.render('inicio')
})

router.get('/productos',async (req, res)=>{
    const productos= await productModel.find({}).lean()
    res.render('productos', {productos})
})

router.delete('/productos/:id', async (req, res)=>{
    const deleted= await productosdb.deleteProduct(req.params.id)
    res.send(deleted.toString())
})
 
router.get('/AgregarProductos', (req, res)=>{
    if(!req.session.user)return res.render('NoLog');
    if(req.session.user.role== 'user')return res.render('NoAutorizado')
    return res.render('newProduct')
})

router.post('/AgregarProductos', async (req, res)=>{
    const {name, price, thumbnail}= req.body
    if(!price || !name || !thumbnail) res.send('Debes llenar todos los campos')
    else await productosdb.createProduct({name, price, thumbnail})
})

router.put('/productos/:id',async (req, res)=>{
    await productosdb.updateProduct(req.params.id, req.body)
    const found= await productModel.find({_id: req.params.id})
    res.send(found)
})


export default router




