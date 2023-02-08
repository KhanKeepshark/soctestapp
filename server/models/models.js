const Sequelize = require("../db");
const {DataTypes} = require('sequelize')

const User = Sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Questionnaire = Sequelize.define('questionnaire', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
})

const QuestionData = Sequelize.define('questiondata', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING,  allowNull: false},
    freeAnswer: {type: DataTypes.BOOLEAN},
    answerNum: {type: DataTypes.INTEGER, allowNull: false},
})

const AnswerData = Sequelize.define('answerdata', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING,  allowNull: false},
    questionDescription: {type: DataTypes.STRING,  allowNull: false},
})

const RegionData = Sequelize.define('regiondata', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
})

const DistrictData = Sequelize.define('districtdata', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
})

const UserChoice = Sequelize.define('userchoice', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    answerChoice: {type: DataTypes.STRING,  allowNull: false},
    order: {type: DataTypes.INTEGER},
    questionChoice: {type: DataTypes.STRING,  allowNull: false},
    positionX: {type: DataTypes.STRING},
    positionY: {type: DataTypes.STRING},
    questionnaireType: {type: DataTypes.STRING,  allowNull: false},
    regionType: {type: DataTypes.STRING,  allowNull: false},
})

Questionnaire.hasMany(QuestionData)
QuestionData.belongsTo(Questionnaire)

RegionData.hasMany(DistrictData)
DistrictData.belongsTo(RegionData)

QuestionData.hasMany(AnswerData)
AnswerData.belongsTo(QuestionData)

User.hasMany(UserChoice)
UserChoice.belongsTo(User)

module.exports = {
    User, QuestionData, AnswerData, UserChoice, RegionData, DistrictData, Questionnaire
}