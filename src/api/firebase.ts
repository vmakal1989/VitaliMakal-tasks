import firebase from 'firebase/app'

export const firebaseUserAPI = {
	createAccount(email: string, password: string) {
		return firebase.auth().createUserWithEmailAndPassword(email, password)
	},
	newSession(email: string, password: string) {
		return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => firebase.auth().signInWithEmailAndPassword(email, password))
	},
	removeSession() {
		return firebase.auth().signOut()
	},
	setUserProfile(userId: string, email: string, firstName: string, lastName: string) {
		return firebase.database().ref(`users/${userId}`).set({email, firstName, lastName})
	},
	getUserProfile(userId) {
		return firebase.database().ref(`users/${userId}`).once('value')
	},
	getUsers() {
		return firebase.database().ref(`users`).once('value')
	}
}

export const firebaseTaskAPI = {
	addTask(name: string, body: string, status: string, importance: string, users: Array<string>) {
		return firebase.database().ref(`tasks`).push({name, body, status, importance, users})
	},
	getTasks() {
		return firebase.database().ref(`tasks`).once('value')
	}
}
