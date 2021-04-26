import {makeAutoObservable, runInAction} from "mobx"
import {firebaseTaskAPI} from "src/api/firebase"
import user from "./User"

class Task {
	state = {
		sections: ["On hold", "Completed"],
		fields: [
			{
				label: "Status",
				options: ["In progress", "Pending", "Completed", 'Canceled']
			},
			{
				label: "Importance",
				options: ["Minor", "Critical", "Normal"]
			},
			{
				label:"Delete"
			}
		],
		tasks: [],
		renderTaskForm: false,
		isFetching: false
	}
	constructor() {
		makeAutoObservable(this)
	}
	async addTask(taskData) {
		let {name, description, status, importance, executor} = taskData
		let users = [executor ? executor : user.state.currentUser.id, user.state.currentUser.id]
		await firebaseTaskAPI.addTask(name, description, status, importance, users)
			.then(response => {
				this.state.tasks.push({name, description, status, importance, users})
			})

	}
	removeTask(id) {
		this.state.tasks = this.state.tasks.filter(task => task.id != id)
	}
	async getTasks() {
		runInAction(()=> this.state.isFetching = true)
		await firebaseTaskAPI.getTasks()
			.then(response => {
				for(let key in response.val()) {
					this.state.tasks.push({id: key, ...response.val()[key]})
				}
				runInAction(()=> this.state.isFetching = false)
			})
	}
	changeTask(id, type, option?) {
		if(type === "Delete") {
			this.removeTask(id)
		} else if(type === "Importance") {
			this.changeImportance(id, option)
		} else if(type === "Status") {
			this.changeStatus(id, option)
		}
	}
	changeStatus(id, option) {
		this.state.tasks.forEach(task => {
			if(task.id === id){
				task.status = option
			}
		})
	}
	changeImportance(id, option) {
		this.state.tasks.forEach(task => {
			if(task.id === id){
				task.importance = option
			}
		})
	}
	getActiveTasks() {
		return this.state.tasks.filter((el) => el.status === 'Pending' || el.status === "In progress")
	}
	getCompletedTasks() {
		return this.state.tasks.filter((el) => el.status === 'Canceled' || el.status === "Completed")
	}
}

export default new Task()