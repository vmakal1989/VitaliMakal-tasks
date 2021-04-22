import {makeAutoObservable} from "mobx"
import {users} from "src/db/users"


class User {
	users = users
	constructor() {
		makeAutoObservable(this)
	}
	getUserPhoto(id) {
		let user = this.users.filter( user => user.id === id)
		return user[0].photoURL
	}
}

export default new User()