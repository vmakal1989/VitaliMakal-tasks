import {makeAutoObservable, runInAction} from "mobx"
import {firebaseUserAPI} from "src/api/firebase"
import app from "src/store/App"

class User {
	state = {
		currentUser: null,
		users: []
	}
	constructor() {
		makeAutoObservable(this)
	}
	createUser(id, email, firstName, lastName) {
		firebaseUserAPI.setUserProfile(id, email, firstName, lastName)
			.then(data => {
				this.state.currentUser = {id, firstName, lastName, email}
				this.state.users.push({id, firstName, lastName, email})
				runInAction(()=> app.state.isAuth = true)
			})
	}
	loginUser() {
		this.state.users = []
		this.getUsers()
		runInAction(()=> app.state.isAuth = true)
	}
	async logOutUser() {
		await firebaseUserAPI.removeSession()
			.then(() => runInAction(()=> app.state.isAuth = false))
	}
	getUsers() {
		firebaseUserAPI.getUsers()
			.then(response => {
				this.state.users.push(this.state.currentUser)
				for(let key in response.val()) {
					if(key != this.state.currentUser.id) 
						this.state.users.push({id: key, ...response.val()[key]})
				}
			})
	}
	getUserProfile(id) {
		firebaseUserAPI.getUserProfile(id)
			.then(response => {
				let {email, firstName, lastName} = response.val()
				this.state.currentUser = {id, firstName, lastName, email}
			})
	}
}

export default new User()