const {Schema, model} = require('mongoose')

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    gallery: {type: Schema.Types.ObjectId, ref: 'Gallery', required: true},
    rating: {type: Number, required: true}
})

module.exports = model('GalleryRating', schema, 'gallery_ratings')
