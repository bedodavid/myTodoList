'use strict'
class User {
    constructor(id=0, name="",  email="", password="", registerDate=null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.registerDate = registerDate;
    }
    get getId() {
        return this.id;
    }

    get getName() {
        return this.name;
    }
    get getEmail() {
        return this.email;
    }
    get getPassword() {
        return this.password;
    }
    get getRegisterDate() {
        return this.registerDate;
    }
}

module.exports = User;
