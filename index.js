import express, { urlencoded } from 'express'
import __dirname from './utils.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routeProducts from './routes/productos.routes.js'
import handlebars from 'express-handlebars'
import productModel from './models/Productos.js'
import routeCarritos from './routes/carrito.routes.js'
import routeRegister from './routes/register.routes.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'


mongoose.set('strictQuery', true)
dotenv.config() 


const PORT= process.env.PORT || 3001
const app= express() 

// Connect DB 

const conexion= mongoose.connect(`${process.env.MONGO_DB_URL}`, (err)=>{
    if(!err) console.log('Base de datos conectada con exito') 
    else console.log('Error al intentar conectar la base de datos')
})


// middlewares
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:`${process.env.MONGO_DB_URL}`,
        ttl:20
    }),
    secret:'shh',
    resave: false,  
    saveUninitialized: false
})) 

app.use('/static', express.static(`${__dirname}/public`))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes 
app.use(routeProducts)
app.use(routeCarritos)
app.use(routeRegister)


app.listen(PORT, ()=> console.log(`Server listening on http://localhost:${PORT}`))  


