const shortid = require('shortid')
const Link = require('../models/Link')
const config = require('config')

module.exports.generate = async (req, res) => {
    try {

        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({from})

        if (existing) {
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ link })

    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'} )
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId }) //??
        res.json(links)
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'} )
    }
}
module.exports.getById = async (req, res) => {
    try {

        const link = await Link.findById(req.params.id) //??
        res.json(link)

    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'} )
    }
}