const express = require('express');

//Initiazliacion express
const app = express();

//Mercado pago
const mercadopago = require('mercadopago');

//Add credentils
mercadopago.configure({
    access_token: 'APP_USR-7971436128563281-102011-47d10b38d42ddc5a53be01be82008b2b-1003730267'
})

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.get('/checkout', (req, res) => {

    // Crea un objeto de preferencia
    let preference = {
        items: [
            {
                title: 'Mi producto',
                unit_price: 100,
                quantity: 1,
            }
        ]
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {

        
        }).catch(function (error) {console.log(error);});

    return res.send('<h1>Hello, test router ASD</h1>')
})

//server
app.listen(8000, () => {
    console.log('Server on port 8000');
});