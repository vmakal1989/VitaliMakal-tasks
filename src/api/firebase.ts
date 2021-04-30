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
	getUserProfile(userId: string) {
		return firebase.database().ref(`users/${userId}`).once('value')
	},
	getUsers() {
		return firebase.database().ref(`users`).once('value')
	}
}

export const firebaseTaskAPI = {
	addTask(name: string, description: string, status: string, importance: string, users: Array<string>) {
		return firebase.database().ref(`tasks`).push({name, description, status, importance, users})
	},
	editTask(id: string, name: string, description: string, status: string, importance: string, users: Array<string>) {
		let updateData = {id, name, description, status, importance, users}
		let updates = {};
		updates[`tasks/${id}`] = updateData;
		return firebase.database().ref().update(updates);
	},
	removeTask(id) {
		return firebase.database().ref(`tasks/${id}`).remove()
	},
	getTask(id) {
		return firebase.database().ref(`tasks/${id}`).once('value')
	},
	getTasks() {
		return firebase.database().ref(`tasks`).once('value')
	}
}

export const firebaseNoticeAPI = {
	addNotice(notice) {
		return firebase.database().ref(`notices`).push(notice)
	},
	getNotices() {
		return firebase.database().ref(`notices`).once('value')
	}
}
