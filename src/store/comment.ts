import {makeAutoObservable, runInAction} from "mobx"
import {firebaseCommentAPI} from "src/api/firebase"
import user from "./user"
import notice from "./notice"

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