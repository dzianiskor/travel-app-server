const {Schema, model} = require('mongoose')

const schema = new Schema({
    img: {type: String},
    name: { type: Schema.Types.ObjectId, ref: 'GalleryName' },
    description: { type: Schema.Types.ObjectId, ref: 'GalleryDescription' }
})

module.exports = model('Gallery', schema, 'galleries')
