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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.post('/checkout', async (req, res) => {

    //Capturar data body
    const { title, price } = req.body;

    console.log(title, price);

    // Crea un objeto de preferencia
    let preference = {
        items: [
            {
                title,
                unit_price: parseInt(price),
                quantity: 1,
                description: "Disputa cada partido como si fuese el último."
            }
        ],
        "back_urls": {
            success: "file:///C:/Users/octi_SSJ/Documents/CURSOS/NodeJS/mercadopago/index.html",
            pending: "",
            failure: ""
        },
        "address": {
            "street_name": "Verona",
            "street_number": 5208,
            "zip_code": "3400"
        }
    };

    try {
        const mp = await mercadopago.preferences.create(preference)

        return res.redirect(mp.body.init_point);

    } catch (err) { console.log(err) }


    // mercadopago.preferences.create(preference)
    //     .then(function (response) {
    //         console.log(response);
    //     }).catch(function (error) { console.log(error); });

})

//server
app.listen(8000, () => {
    console.log('Server on port 8000');
});