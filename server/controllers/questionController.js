const { QuestionData } = require("../models/models")

class QuestionController {
    async create(req, res) {
        const {description, freeAnswer, answerNum, questionnaireId} = req.body
        const test = await QuestionData.create({description, freeAnswer, answerNum, questionnaireId})
        return res.json(test)
    }

    async getAll(req, res) {
        const test = await QuestionData.findAll()
        return res.json(test)
    }

    async delete(req, res) {
        const {id} = req.params
        const test = await QuestionData.findByPk(id)
        test.destroy()
        return res.status(200).send({message: `question with ${id} deleted`})
    }

    async update(req, res) {
        const {id} = req.params
        const {description} = req.body
        const test = await QuestionData.update({ description: description }, { where : {
            id: id
        }})
        return res.json(test)
    }

}

module.exports = new QuestionController()