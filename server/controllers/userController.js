const jwt = require("jsonwebtoken")
const { User } = require("../models/models")
const bcrypt = require('bcrypt')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        )
}

class UserController {
    async registration(req, res) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return res.status(200).json({message: 'WRONG EMAIL OR PASSWORD'})
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return res.status(200).json({message: 'EMAIL ALREADY EXIST'})
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res) {
        const {email, password} = req.body
        console.log(email, password)
        const user = await User.findOne({where: {email}})
        console.log(user);
        if (!user) {
            return res.status(200).json({message: 'USER DOES NOT EXIST'})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {

            return res.status(200).json({message: 'WRONG PASSWORD'})
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }

    async delete(req, res) {
        const {id} = req.params
        const user = await User.findByPk(id)
        user.destroy()
        return res.status(200).send({message: `user with ${id} deleted`})
    }
}

module.exports = new UserController()