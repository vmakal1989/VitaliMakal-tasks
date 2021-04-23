import {makeAutoObservable} from "mobx"
import {tasks} from "src/db/tasks"

class Task {
	state = {
		taskOptions: {
			sections: ["On hold", "Completed"],
			options: [
				{
					"Status": ["In progress", "Pending", "Completed", 'Canceled']
				},
				{
					"Importance": ["Minor", "Critical", "Normal"]
				},
				{
					"Delete": "Delete"
				}
			]
		},
		tasks: tasks,
		renderTaskForm: false
	}
	constructor() {
		makeAutoObservable(this)
	}
	addTask(task) {
		this.state.tasks.push(task)
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