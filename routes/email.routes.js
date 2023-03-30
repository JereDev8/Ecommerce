import nodemailer from 'nodemailer'
import { Router } from 'express';

const router= Router()

const GMAIL_USER= 'quinterosjeremias8@gmail.com';
const GMAIL_PSW= 'hmzwfatglfquolco';

export const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PSW
    }
});


router.get('/email', async (req, res)=>{
    res.render('email')
    const result= await transporter.sendMail({
        from:GMAIL_USER,
        to:'jeremias8quinteros@gmail.com',
        subject:'Correo de prueba :)',
        html: `<div> <h1> Hola nodemailer! </h1> </div>`
    })

    console.log(result)
})



export default router