import {makeAutoObservable} from "mobx";

export default class UserForm {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._access = false
        makeAutoObservable(this)
    }


    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }
    setAccess(access){
        this._access = access
    }

    get isAuth(){
        return this._isAuth
    }
    get access(){
        return this._access
    }
    get user(){
        return this._user
    }
}

