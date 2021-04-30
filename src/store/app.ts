import {makeAutoObservable, runInAction} from "mobx"
import firebase from "firebase"
import user from "src/store/user"

class App {
	state = {
		isFetching: false,
		isAuth: false,
		formIsFetching: false
	}
	constructor() {
		makeAutoObservable(this)
	}
	async initializeApp() {
		runInAction(() => 	this.state.isFetching = true)
		await firebase.auth().onAuthStateChanged((u) => {
			if(u) {
				runInAction(()=> this.state.isAuth = true)
				user.getUserProfile(u.uid)
			}
			runInAction(() => 	this.state.isFetching = false)
		})
	}
}

export default new App()