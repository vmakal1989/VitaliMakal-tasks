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
				options: ["Minor", "Normal", "Critical"]
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
				runInAction(()=> this.state.tasks.push({id: response.key,name, description, status, importance, users})) 
			})

	}
	changeTask(taskId, type, option?) {
		let {id, name, description, status, importance, users} = this.state.tasks.filter(task => taskId === task.id)[0]
		switch(type) {
			case "Delete":
				firebaseTaskAPI.removeTask(id)
				this.state.tasks = this.state.tasks.filter(task => task.id != id)
				break
			case "Importance":
				firebaseTaskAPI.editTask(id, name, description, status, importance = option, users)
				this.state.tasks.map(task => task.id === id ? task.importance = option : task)
				break
			case "Status":
				firebaseTaskAPI.editTask(id, name, description, status = option, importance, users)
				this.state.tasks.map(task => task.id === id ? task.status = option : task)
				break
			default: null
		}
	}
	async getTasks() {
		runInAction(()=> this.state.isFetching = true)
		await firebaseTaskAPI.getTasks()
			.then(response => {
				for(let key in response.val()) {
					runInAction(()=> this.state.tasks.push({id: key, ...response.val()[key]})) 
				}
				runInAction(()=> this.state.isFetching = false)
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