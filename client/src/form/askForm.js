import {makeAutoObservable} from "mobx";

export default class AskFormData {
    
    constructor() {
        this._questionnaire = ''
        this._district = ''
        makeAutoObservable(this)
    }

    setQuestionnaire(questionnaire){
        this._questionnaire = questionnaire
    }

    setDistrict(district){
        this._district = district
    }

    get questionnaire(){
        return this._questionnaire
    }

    get district(){
        return this._district
    }

}