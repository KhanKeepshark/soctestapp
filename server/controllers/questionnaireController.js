const { Questionnaire } = require("../models/models")

class QuestionnaireController {
    async create(req, res) {
        const {name} = req.body
        const test = await Questionnaire.create({name})
        return res.json(test)
    }

    async getAll(req, res) {
        const test = await Questionnaire.findAll()
        return res.json(test)
    }

    async delete(req, res) {
        const {id} = req.params
        const test = await Questionnaire.findByPk(id)
        test.destroy()
        return res.status(200).send({message: `Questionnaire with ${id} deleted`})
    }

    async update(req, res) {
        const {id} = req.params
        const {name} = req.body
        const test = await Questionnaire.update({ name: name }, { where : {
            id: id
        }})
        return res.json(test)
    }

}

module.exports = new QuestionnaireController()