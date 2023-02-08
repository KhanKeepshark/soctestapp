const { RegionData } = require("../models/models")

class RegionController {
    async create(req, res) {
        const {name} = req.body
        const test = await RegionData.create({name})
        return res.json(test)
    }

    async getAll(req, res) {
        const test = await RegionData.findAll()
        return res.json(test)
    }

    async delete(req, res) {
        const {id} = req.params
        const test = await RegionData.findByPk(id)
        test.destroy()
        return res.status(200).send({message: `region with ${id} deleted`})
    }

    async update(req, res) {
        const {id} = req.params
        const {name} = req.body
        const test = await RegionData.update({ name: name }, { where : {
            id: id
        }})
        return res.json(test)
    }

}

module.exports = new RegionController()