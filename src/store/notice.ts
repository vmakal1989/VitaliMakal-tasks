import {makeAutoObservable, runInAction} from "mobx"
import {firebaseNoticeAPI, firebaseUserAPI} from "src/api/firebase"
import user from "./user"

class Notice {
	state = {
		notices: []
	}
	constructor() {
		makeAutoObservable(this)
	}
	async addNotice(data) {
		let response
		switch (data.event) {
			case "UpdateProfile":
			 	response = await firebaseNoticeAPI.addNotice({type: "UpdateProfile", recipient: data.id})
				break
			case "CreateTask":
				response = await firebaseNoticeAPI.addNotice({type: "CreateTask", author: user.state.currentUser,
					 executor: data.executor, task: data.task ,recipient: "all"})
				break
			case "UpdateTask":
				response = await firebaseNoticeAPI.addNotice({type: "UpdateTask", author: user.state.currentUser,
					task: data.task,keyWord: data.keyWord, recipient: "all"})
				break
			case "LeaveComment":
				response = await firebaseNoticeAPI.addNotice({type: "LeaveComment", author: user.state.currentUser,
					task: data.task, body: data.body, recipient: "all"})
				break
			case "RemoveTask":
				response = await firebaseNoticeAPI.addNotice({type: "RemoveTask", author: user.state.currentUser,
					task: data.task, recipient: "all"})
				break
		}
		runInAction(()=> this.state.notices.unshift({id: response.key, type: data.event, author: user.state.currentUser,
			task: data.task, body: data.body, executor: data.executor, recipient: data.id,  keyWord: data.keyWord}))
	}
	getNotices() {
		firebaseNoticeAPI.getNotices()
			.then(response => {
				runInAction(()=> this.state.notices = [])
				for(let key in response.val()) {
					if(response.val()[key].recipient === user.state.currentUser.id || response.val()[key].recipient === "all") {
						runInAction(()=> this.state.notices.unshift({id: key, ...response.val()[key]}))
					}
				}
			})
	}
	renderNotices() {
		return this.state.notices
	}
}

export default new Notice()