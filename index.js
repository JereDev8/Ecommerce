//en Clase-36
 

// A implementar, crear un checkpoint donde pueda entrar a ver un producto y ya ver mas caracteristicas y que me de la opcion de comprar como en MELI
import express, { urlencoded } from 'express'
import __dirname from './utils.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import productModel from './models/Productos.js'
import routeProducts from './routes/productos.routes.js'
import routeCarritos from './routes/carrito.routes.js'
import routeLogin from './routes/login.routes.js'
import routeEmail from './routes/email.routes.js'
import routeRegister from './routes/register.routes.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import initializeStrategies from './Auth/passport.config.js'
import passport from 'passport'


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
        ttl:180
    }),
    secret:'shh',
    resave: true,  
    saveUninitialized: false  
}))
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session()); 
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
app.use(routeLogin)
app.use(routeEmail)

app.listen(PORT, ()=> console.log(`Server listening on http://localhost:${PORT}`))  


