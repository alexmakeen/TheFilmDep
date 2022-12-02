const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');

// endpoint for the get film API 
const {
    getAllFilm,
    getFilmId,
}= require ("./handlers/FilmHandlers")


const {
    currentlyOwned,
    getCO,
    updateCONotes,
}= require ("./handlers/CurrentlyOwnedHandlers")

const {
    getWishlist,
    addWishlist,
}= require ("./handlers/wishlistHandlers")

const port = 8000

//GfwosbTZ8LnRVrU5

express()
    .use(function(req, res, next) {
        res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE');
        res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
        next();
        })
    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))
    .use(express.urlencoded({ extended: false }))
    .use('/', express.static(__dirname + '/'))



    .get('/searchAll', getAllFilm)

    .get('/searchAll/items/:name', getFilmId)

    .get('/currentlyOwned', getCO)
    .post('/currentlyOwned', currentlyOwned)
    .patch('/currentlyOwned', updateCONotes)

    .get('/wishlist', getWishlist)
    .post('/wishlist', addWishlist)




    .listen(port, () => {
        console.log(`listening on port ${port}`)
    });