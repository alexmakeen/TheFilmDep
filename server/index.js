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
    deleteCO,
    postPhoto,
    getPhoto,
}= require ("./handlers/CurrentlyOwnedHandlers")

const {
    getWishlist,
    addWishlist,
}= require ("./handlers/WishlistHandlers")


const {
    addComments,
    getComments,
}= require("./handlers/CommentsHandlers")

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
    .delete('/currentlyOwned', deleteCO)
    .post('/photos', postPhoto)
    .get('/photos', getPhoto)

    .get('/wishlist', getWishlist)
    .post('/wishlist', addWishlist)

    .get('/comments', getComments)
    .post('/comments', addComments)


    .listen(port, () => {
        console.log(`listening on port ${port}`)
    });