import {makeAutoObservable} from "mobx"
import {users} from "src/db/users"


class User {
	state = {
		users: users
	}
	constructor() {
		makeAutoObservable(this)
	}
	getUserPhoto(id) {
		let user = this.state.users.filter( user => user.id === id)
		return user[0].photoURL
	}
}

export default new User()