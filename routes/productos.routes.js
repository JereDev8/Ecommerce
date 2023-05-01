import { Router } from "express";
import productModel from "../models/Productos.js";
import ProductosDB from '../DAOs/productosDB.js'
import userModel from "../models/User.js";

const productosdb= new ProductosDB()

const router= Router()

router.get('/', async (req, res)=>{
    const eightProds= await productosdb.eightProdsDTO('Electrodomesticos')
    if(!req.session.user) return res.render('inicio', {productos:eightProds, categoria: eightProds[0].category})
    res.render('inicio',{avatar: req.session.user.avatar, productos:eightProds});
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
    console.log(req.body)
    const { id }= req.body;
    const producto= await productModel.findOne({_id:id});
    const user= await userModel.findOne({email: req.session.user.email});
    // console.log(user.carrito)
    await userModel.updateOne({email: req.session.user.email}, {$push:{'carrito':producto}});
})


router.get('/productos/:name', async (req, res)=>{
    const prods= await productModel.find({name:{$regex:req.params.name, $options:'i'}}).lean();
    if(!req.session.user) return res.render('producto-buscado', {prods}) 
    await res.render('producto-buscado', {prods, avatar:req.session.user.avatar})
})

router.post('/searchProduct', async (req, res)=>{
    const url= await `/productos/${req.body.value}`;
    await res.redirect(url)
})

const prodsNuevos= [
    {
        name: "Lavarropa",
        price: 4500,
        thumbnail:"https://images.samsung.com/is/image/samsung/ar-ww65m0nhwu-ww65m0nhwu-xbg-kg-149275648?scl=1&fmt=png-alpha",
        category: "electrodomesticos"
    },
    {
        name:"Aire acondicionado",
        price:3500,
        thumbnail:"https://www.casadelaudio.com/Image/0/500_500-CDA%20NUEVO%2012.png" ,
        category:"electrodomesticos"
    },
    {
        name:"Cafetera",
        price:6400,
        thumbnail:"https://www.philips.com.ar/c-dam/b2c/category-pages/Household/coffee/master/philips-filter/Philips_Cafe_Gaia.png" ,
        category:"electrodomesticos"
    },
    {
        name:"Tostadora",
        price:4200,
        thumbnail:"https://electroluxar.vtexassets.com/arquivos/ids/162070/Toaster_ETS11_Perspective_Electrolux_Spanish_1000x1000.png?v=637841653359670000" ,
        category:"electrodomesticos"
    },
    {
        name:"Licuadora",
        price:5600,
        thumbnail:"https://www.yelmo.com.ar/Image/0/500_500-LicuadoraCeleste01.png" ,
        category:"electrodomesticos"
    },
    {
        name:"Secador de pelo",
        price: 3600 ,
        thumbnail:"https://images.fravega.com/f1000/79276f43eb5c232bc45438b7e26434a6.jpg",
        category:"electrodomesticos"
    },
    {
        name:"Plancha de pelo",
        price:11450,
        thumbnail:"https://www.ideahogar.com.ar/9596-large_default/plancha-de-pelo-atma-pl8890.jpg",
        category:"electrodomesticos"
    }
]

// router.get('/agregarNuevosProds', async (req, res)=>{
//     await productModel.create(prodsNuevos)
// })

export default router




