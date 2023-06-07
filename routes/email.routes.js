import nodemailer from 'nodemailer'
import { Router } from 'express';
import userModel from '../models/User.js';

const router= Router()
const date = new Date()
const GMAIL_USER= 'quinterosjeremias8@gmail.com'
const GMAIL_PSW= 'hmzwfatglfquolco'

export const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 465,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PSW
    }
});


router.get('/email', async (req, res)=>{
    res.render('email');
    const user = await userModel.findOne({email: req.session.user.email});
    let html = '';
    let price = 0;
    user.carrito.forEach((prod)=>{
        html += `<li> ${prod.name} : ${prod.price} </li>`;
        price += prod.price;
    })


    const result= await transporter.sendMail({
        from: GMAIL_USER, 
        to: req.session.user.email,
        subject:'Comprobante de Compra! ',
        html: `<div>
                <h1> Gracias por tu compra! </h1> 
               </div>
               <div>
               <p>Fecha de compra: ${date.getDay()} - ${date.getDate()} - ${date.getFullYear()}</p>
               <p> Has comprado lo siguiente</p>
              <ul>
                 ${html}
              </ul>
               </div>
               <div>
               <b> Total : ${price.toString()} </b>
               </div>
               `
    })

})



export default router