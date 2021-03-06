const shortid = require('shortid')
const Link = require('../models/Link')
const config = require('config')

module.exports.redirect = async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        if (link) {
            link.clicks ++
            await link.save()
            return res.redirect(link.from)
        }

        res.status(404).json('Ссылка не найдена')

    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'} )
    }
}