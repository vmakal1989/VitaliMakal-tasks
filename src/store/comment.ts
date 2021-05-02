import {makeAutoObservable, runInAction} from "mobx"
import {firebaseCommentAPI, firebaseTaskAPI} from "src/api/firebase"
import user from "./user"
import notice from "./notice"
import taskStore from "./task"

class Comment {
	state = {
		comments: []
	}
	constructor() {
		makeAutoObservable(this)
	}
	async addComment(value, task) {
		let comment = {body: value, taskId: task.id, author: user.state.currentUser}
			await firebaseCommentAPI.addComment(comment)
				.then(response => {
					runInAction(()=> this.state.comments.unshift({id: response.key, ...comment}))
					notice.addNotice({event: "LeaveComment", body: value, task})
					if(task.users.filter(u => u.id === user.state.currentUser.id).length === 0 ) {
						firebaseTaskAPI.editTask(task.id, task.name, task.description, task.status, task.importance, [...task.users, user.state.currentUser])
						taskStore.state.tasks.map(t => t.id === task.id ? t.users = [...t.users, user.state.currentUser] : t)
					}
				})

	}
	async getComments(taskId) {
		runInAction(()=> this.state.comments = [])
		await firebaseCommentAPI.getComment(taskId)
			.then(response => {
				for(let key in response.val()) {
					runInAction(() => this.state.comments.unshift({id: key, ...response.val()[key]}))
				}
			})
	}
}

export default new Comment()