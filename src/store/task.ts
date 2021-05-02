import {makeAutoObservable, runInAction} from "mobx"
import {firebaseTaskAPI, firebaseUserAPI} from "src/api/firebase"
import user from "./user"
import notice from "./notice"

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
				label:"Remove"
			}
		],
		searchValue: '',
		task: null,
		tasks: [],
		renderTaskForm: false,
		isFetching: false
	}
	constructor() {
		makeAutoObservable(this)
	}
	async addTask(taskData) {
		let {name, description, status, importance, executor} = taskData
		await firebaseUserAPI.getUserProfile(executor)
			.then(response => {
				let users = [executor ? {id: executor, ...response.val()} : user.state.currentUser, user.state.currentUser]
				firebaseTaskAPI.addTask(name, description, status, importance, users)
					.then(response => {
						runInAction(()=> this.state.tasks.push({id: response.key,name, description, status, importance, users}))
						notice.addNotice({event: "CreateTask", task: {id: response.key, name}, executor: users[0]})
					})
			})
	}
	async changeTask(taskId, type, option?) {
		let {id, name, description, status, importance, users} = this.state.tasks.filter(task => taskId === task.id)[0]
		switch(type) {
			case "Remove":
				this.state.tasks = this.state.tasks.filter(task => task.id != id)
				await notice.addNotice({event: "RemoveTask", task: {id, name}})
				await firebaseTaskAPI.removeTask(id)
				break
			case "Importance":
				await notice.addNotice({event: "UpdateTask", task: {id, name}, keyWord: [type, option]})
				await firebaseTaskAPI.editTask(id, name, description, status, importance = option, users)
				this.state.tasks.map(task => task.id === id ? task.importance = option : task)
				break
			case "Status":
				await notice.addNotice({event: "UpdateTask",task: {id, name}, keyWord: [type, option]})
				await firebaseTaskAPI.editTask(id, name, description, status = option, importance, users)
				this.state.tasks.map(task => task.id === id ? task.status = option : task)
				break
			default: null
		}
	}
	async getTask(id) {
		runInAction(()=> this.state.isFetching = true)
		await firebaseTaskAPI.getTask(id)
			.then(response => {
				response.val()
					? this.state.task = {id: response.key, ...response.val()}
					: this.state.task = "404"
				runInAction(()=> this.state.isFetching = false)
			})
	}
	async getTasks() {
		runInAction(()=> this.state.isFetching = true)
		await firebaseTaskAPI.getTasks()
			.then(response => {
				runInAction(()=> this.state.tasks = [])
				for(let key in response.val()) {
					runInAction(()=> this.state.tasks.push({id: key, ...response.val()[key]}))
				}
				runInAction(()=> this.state.isFetching = false)
			})
	}
	renderTasks(sections) {
		switch (sections) {
			case "On hold":
				return this.state.searchValue ?
					 this.state.tasks.filter(task => {
						let arrWords = task.name.split(" ")
						return arrWords.filter(word => word.includes(this.state.searchValue)
							|| word.toLowerCase().includes(this.state.searchValue)).length  !== 0
					}).filter((el) => el.status === 'Pending' || el.status === "In progress")
					:
					 this.state.tasks.filter((el) => el.status === 'Pending' || el.status === "In progress")
			case "Completed":
				return this.state.searchValue ?
					this.state.tasks.filter(task => {
						let arrWords = task.name.split(" ")
						return arrWords.filter(word => word.includes(this.state.searchValue)
							|| word.toLowerCase().includes(this.state.searchValue)).length  !== 0
					}).filter((el) => el.status === 'Canceled' || el.status === "Completed")
					:
					this.state.tasks.filter((el) => el.status === 'Canceled' || el.status === "Completed")
			default:
				return this.state.tasks
		}
	}
	hotSearch(val) {
		this.state.searchValue = val.trim()
	}
}

export default new Task()