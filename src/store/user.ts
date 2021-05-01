import {makeAutoObservable, runInAction} from "mobx"
import {firebaseTaskAPI, firebaseUserAPI} from "src/api/firebase"
import app from "src/store/app"
import notice from "src/store/notice"
import task from "./task"

class User {
	state = {
		currentUser: null,
		users: [],
		user: null,
		isFetching: false
	}
	constructor() {
		makeAutoObservable(this)
	}
	async createUser(id, email, firstName, lastName) {
		await firebaseUserAPI.setUserProfile(id, email, firstName, lastName)
			.then(() => {
				this.state.currentUser = {id, firstName, lastName, email}
				this.loginUser()
				notice.addNotice({event:"UpdateProfile", id})
			})
	}
	async loginUser() {
		await task.getTasks()
		await this.getUsers()
		await notice.getNotices()
		runInAction(()=> app.state.isAuth = true)
	}
	async logOutUser() {
		await firebaseUserAPI.removeSession()
			.then(() => runInAction(()=> app.state.isAuth = false))
	}
	async getUsers() {
		await firebaseUserAPI.getUsers()
			.then(response => {
				this.state.users = []
				this.state.users.push(this.state.currentUser)
				for(let key in response.val()) {
					if(key !== this.state.currentUser.id)
						this.state.users.push({id: key, ...response.val()[key]})
				}
			})
	}
	async getUser(id) {
		runInAction(()=> this.state.isFetching = true)
		await firebaseUserAPI.getUser(id)
			.then(response => {
				response.val()
					? this.state.user = {id: response.key, ...response.val()}
					: this.state.user = "404"
				runInAction(()=> this.state.isFetching = false)
			})
	}
	async getUserProfile(id) {
		await firebaseUserAPI.getUserProfile(id)
			.then(response => {
				let {email, firstName, lastName} = response.val()
				this.state.currentUser = {id, firstName, lastName, email}
			})
	}
}

export default new User()