const { UserChoice } = require("../models/models")

class UserChoiceController {
    async create(req, res) {
        const {answerChoice, questionChoice, userId, order, positionX, positionY, questionnaireType, regionType} = req.body
        const userData = await UserChoice.create({answerChoice, questionChoice, userId, order, positionX, positionY, questionnaireType, regionType})
        return res.json(userData)
    }

    async getAll(req, res) {
        const usersData = await UserChoice.findAll()
        return res.json(usersData)
    }

    async delete(req, res) {
        const {id} = req.params
        const usersData = await UserChoice.findByPk(id)
        usersData.destroy()
        return res.status(200).send({message: `choice with ${id} deleted`})
    }

}

module.exports = new UserChoiceController()