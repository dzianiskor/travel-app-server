const {Router} = require('express')
const router = Router()
const fs = require('fs')
const Country = require('../models/Country')
const CountryCapital = require('../models/CountryCapital')
const CountryName = require('../models/CountyName')
const CountryDescription = require('../models/CountyDescription')
const Gallery = require('../models/Gallery')
const GalleryName = require('../models/GalleryName')
const GalleryDescription = require('../models/GalleryDescription')

router.get('/uploadCountriesInDB', async (req, res) => {
    try {
        const data = await readFile("countries.json");
        const countries = JSON.parse(data)
        for (const country of countries) {
            let galleryIds = []
            for (const galleryElem of country.gallery) {
                const galleryName = await GalleryName.collection.insertOne(galleryElem.name)
                const galleryDescription = await GalleryDescription.collection.insertOne(galleryElem.desc)
                const newGallery = await Gallery.collection.insertOne(
                    {
                        img: galleryElem.img,
                        name: galleryName.insertedId,
                        description: galleryDescription.insertedId
                    })
                galleryIds.push(newGallery.insertedId)
            }
            const countryName = await CountryName.collection.insertOne(country.nameCountry)
            const countryDescription = await CountryDescription.collection.insertOne(country.descriptionAboutCountry)
            const countryCapital = await CountryCapital.collection.insertOne(country.capital)
            const newCountry = new Country({
                countryIso: country.countryISO,
                name: countryName.insertedId,
                iso: country.ISO,
                video: country.video,
                utc: country.utc,
                zoom: country.zoom,
                coordCountry: country.coordCountry,
                coordCapital: country.coordCapital,
                img: country.imgCountry,
                description: countryDescription.insertedId,
                capital: countryCapital.insertedId,
                galleries: galleryIds
            })
            await newCountry.save()
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
    res.json('Countries uploaded!')
})

async function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

module.exports = router
