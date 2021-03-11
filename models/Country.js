const {Schema, model} = require('mongoose')

const schema = new Schema({
    countryIso: {type: String},
    iso: {type: String},
    video: {type: String},
    utc: {type: Number},
    zoom: {type: Number},
    img: {type: String},
    coordCountry: {type: Array},
    coordCapital: {type: Array},
    name: { type: Schema.Types.ObjectId, ref: 'CountryName' },
    description: { type: Schema.Types.ObjectId, ref: 'CountryDescription' },
    capital: { type: Schema.Types.ObjectId, ref: 'CountryCapital' },
    galleries: [{ type: Schema.Types.ObjectId, ref: 'Gallery' }]
})

module.exports = model('Country', schema, 'countries')
