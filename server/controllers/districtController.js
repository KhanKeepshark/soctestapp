const { DistrictData } = require("../models/models")

class DistrictController {
    async create(req, res) {
        const {name, regiondatumId} = req.body
        const test = await DistrictData.create({name, regiondatumId})
        return res.json(test)
    }

    async getAll(req, res) {
        const test = await DistrictData.findAll()
        return res.json(test)
    }

    async delete(req, res) {
        const {id} = req.params
        const test = await DistrictData.findByPk(id)
        test.destroy()
        return res.status(200).send({message: `district with ${id} deleted`})
    }

    async update(req, res) {
        const {id} = req.params
        const {name} = req.body
        const test = await DistrictData.update({ name: name }, { where : {
            id: id
        }})
        return res.json(test)
    }

}

module.exports = new DistrictController()