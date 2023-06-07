import passport from "passport";
import local from 'passport-local'
import userModel from "../models/User.js";
import bcrypt from "bcrypt"

const LocalStrategy = local.Strategy

const initializeStrategies = () => {
    passport.use('login', new LocalStrategy({ usernameField: 'email' },async (email, password, done) => {
        if (!email || !password) return done(null, false, {message: 'Debes completar todos los campos'})
        const exist = await userModel.findOne({email});
        // console.log(exist)
        if (!exist) return done(null, false, {message: 'Este email no esta registrado'});
        const compare = await bcrypt.compare(password, exist.password)
        if (compare) return done(null, exist)
        return done(null, false, {message: 'La contraseña no es valida'})
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        const result=await userModel.findOne({_id: id})
        done(null,result)
    })
}


export default initializeStrategies