const { restart } = require('nodemon');
const request = require('request-promise');


const getAllFilm = async (req, res) => {
    let film = {uri: 'https://filmapi.vercel.app/api/films', headers: {Accept: "application/json"}, json: 200}
  try {
    const getFilm = await request(film);
    const filmAll = getFilm.map(item => {
        return item
    })
    return res.status(200).json({status: 200, data: filmAll})

  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};



const getFilmId = async (req, res) => {
const _id = req.params.name

let film = {uri: 'https://filmapi.vercel.app/api/films', headers: {Accept: "application/json"}, json: 200}

try {
const getFilm = await request(film);

// console.log(getFilm)

const filmAllId = getFilm.find(item => {
    const noSpace = (item.name).replace(/\s+/g, '')
    console.log(noSpace)
    return noSpace === _id
})

console.log(filmAllId)

    filmAllId
    ? res.status(200).json({status: 200, data: filmAllId})
    : res.status(404).json({status: 404, message: "invalid search"});

} catch (err) {
return res.status(500).json({ status: 500, message: err.message });
}

}

module.exports = {
    getAllFilm,
    getFilmId
}