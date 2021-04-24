import {makeAutoObservable} from "mobx"
import {tasks} from "src/db/tasks"
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
		tasks: tasks,
		renderTaskForm: false
	}
	constructor() {
		makeAutoObservable(this)
	}
	addTask(taskData) {
		let {name, description, status, importance} = taskData
		let userId = user.state.users.filter(user => user.name === taskData.executor)[0].id
		this.state.tasks.push({id: 35,name, description, status, importance, users: [userId]})
	}
	removeTask(id) {
		this.state.tasks = this.state.tasks.filter(task => task.id != id)
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