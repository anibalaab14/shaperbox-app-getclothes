var cloudinary = require('cloudinary');
require('dotenv').config();
const express = require('express');
const app = express()
app.use(express.json());

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY
});



app.post('/shaperbox/v1/app-getclothes', function (req, res) {


    if (req.body.screen=="front"){
    console.log(req.body.quantity);
    cloudinary.v2.search
        .expression('resource_type:image AND')
        .sort_by('public_id', 'desc')
        .max_results(req.body.quantity)
        .execute().then(result => {
            res.send(result);
        });  
             //Se debe agregar para que busque 
            //imagenes de pantalla informativa sobre como utilizar laapp
    }else{
        console.log(req.body.quantity);
        cloudinary.v2.search
            .expression('resource_type:image')
            .sort_by('public_id', 'desc')
            .max_results(req.body.quantity)
            .execute().then(result => {
                res.send(result);
            });
    }
    

});
app.listen(process.env.PORT);
console.log(process.env.PORT);