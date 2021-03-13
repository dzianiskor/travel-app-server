const {Router} = require('express')
const router = Router()
const Country = require('../models/Country')
const config = require('config')
const DEFAULT_LANG = process.env.DEFAULT_LANG || config.get('defaultLang') || 'ru'

router.get('/', async (req, res) => {
    try {
        const lang = req.query.lang || DEFAULT_LANG
        const countries = await Country.find({})
            .select('-galleries')
            .populate('name', `${lang} -_id`)
            .populate('description', `${lang} -_id`)
            .populate('capital', `${lang} -_id`)
            .lean()

        res.json(countries.map(country => normalizeCountry(country, lang)))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

router.get('/getAllDataCountries', async (req, res) => {
    try {
        const country = await Country.find({})
            .populate('name', `-_id`)
            .populate('description', `-_id`)
            .populate('capital', `-_id`)
            .populate({
                path: 'galleries',
                select: '-_id',
                populate: [
                    {
                        path: 'name',
                        select: `-_id`
                    },
                    {
                        path: 'description',
                        select: `-_id`
                    }
                ]
            })
        res.json(country)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const lang = req.query.lang || DEFAULT_LANG
        const country = await Country.findById(id)
            .populate('name', `${lang} -_id`)
            .populate('description', `${lang} -_id`)
            .populate('capital', `${lang} -_id`)
            .populate({
                path: 'galleries',
                populate: [
                    {
                        path: 'name',
                        select: `${lang} -_id`
                    },
                    {
                        path: 'description',
                        select: `${lang} -_id`
                    },
                    {
                        path: 'ratings',
                        select: `user rating -_id`,
                        populate: {
                            path: 'user',
                            select: `email -_id`
                        }
                    }
                ]
            })
            .lean()

        res.json(normalizeCountry(country, lang))
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

function normalizeCountry(country, lang) {
    return {
        ...country,
        name: country.name[lang],
        capital: country.capital[lang],
        description: country.description[lang],
        galleries: (country.galleries) ? country.galleries.map(gallery => ({
            ...gallery,
            name: gallery.name[lang],
            description: gallery.description[lang]
        })) : ''
    }
}

module.exports = router
