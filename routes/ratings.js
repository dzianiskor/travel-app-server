const {Router} = require('express')
const router = Router()
const Gallery = require('../models/Gallery')
const GalleryRating = require('../models/GalleryRating')
const auth = require('../middleware/auth.middleware')

router.post('/set-rating', auth, async (req, res) => {
    try {
        const {galleryId} = req.body
        const rating = parseInt(req.body.rating)
        if (!galleryId || rating < 1 || rating > 5) {
            return res.status(400).json({message: 'no correct data'})
        }

        const issetRating = await GalleryRating.findOne({user: req.user.userId, gallery: galleryId})
        if (issetRating) {
            issetRating.rating = rating
            await issetRating.save()

            return res.status(201).json({message: 'Rating saved'})
        }

        const galleryRating = new GalleryRating({
            user: req.user.userId,
            gallery: galleryId,
            rating
        })
        await galleryRating.save()

        const gallery = await Gallery.findById(galleryId)
        gallery.ratings.push(galleryRating._id)
        await gallery.save()

        return res.status(201).json({message: 'Rating saved'})
    } catch (e) {
        res.status(400).json({message: e.message || 'Something went wrong'})
    }
})

module.exports = router
