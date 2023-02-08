const { AnswerData } = require("../models/models")

class AnswerController {
    async create(req, res) {
        const {description, questiondatumId, questionDescription} = req.body
        const test = await AnswerData.create({description, questiondatumId, questionDescription})
        return res.json(test)
    }

    async getAll(req, res) {
        const test = await AnswerData.findAll()
        return res.json(test)
    }

    async delete(req, res) {
        const {id} = req.params
        const test = await AnswerData.findOne({
            where: {
                questiondatumId: id
            }
        })
        console.log(test)
        test.destroy()
        return res.status(200).send({message: `question with ${id} deleted`})

    }

}

module.exports = new AnswerController()