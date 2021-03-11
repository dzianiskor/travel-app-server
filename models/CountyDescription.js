const {Schema, model} = require('mongoose')

const schema = new Schema({
    ru: {type: String},
    en: {type: String},
    gr: {type: String}
})

module.exports = model('CountryDescription', schema, 'country_descriptions')
