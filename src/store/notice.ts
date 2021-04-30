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
		let executor = await firebaseUserAPI.getUserProfile(data.executor)
			.then(response => response)
		switch (data.event) {
			case "UpdateProfile":
			 	response = await firebaseNoticeAPI.addNotice({type: "UpdateProfile", recipient: data.id})
				break
			case "CreateTask":
				response = await firebaseNoticeAPI.addNotice({type: "CreateTask", author: user.state.currentUser,
					 executor: {id: data.executor, ...executor.val()}, task: data.task ,recipient: "all"})
				break
			case "UpdateTask":
				response = await firebaseNoticeAPI.addNotice({type: "UpdateTask", author: user.state.currentUser,
					task: data.task,keyWord: data.keyWord, recipient: "all"})
				break
			case "LeaveComment":
				response = await firebaseNoticeAPI.addNotice({type: "LeaveComment", author: user.state.currentUser,
					taskId: data.taskId, recipient: "all"})
				break
			case "RemoveTask":
				response = await firebaseNoticeAPI.addNotice({type: "RemoveTask", author: user.state.currentUser,
					task: data.task, recipient: "all"})
				break
		}
		runInAction(()=> this.state.notices.unshift({id: response.key, type: data.event, author: user.state.currentUser,
			task: data.task, executor: {id: data.executor, ...executor.val()}, recipient: data.id,  keyWord: data.keyWord}))
	}
	getNotices() {
		this.state.notices = []
		firebaseNoticeAPI.getNotices()
			.then(response => {
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