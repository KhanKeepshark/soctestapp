const { UserData } = require("../models/models")

class UserDataController {
    async create(req, res) {
        const {name, secondname, thirdname, sex, birthdate, phone, city} = req.body
        const userData = await UserData.create({name, secondname, thirdname, sex, birthdate, phone, city})
        return res.json(userData)
    }

    async getAll(req, res) {
        const usersData = await UserData.findAll()
        return res.json(usersData)
    }

    async delete(req, res) {
        const {id} = req.params
        const usersData = await UserData.findByPk(id)
        usersData.destroy()
        return res.status(200).send({message: `userData with ${id} deleted`})
    }

}

module.exports = new UserDataController()