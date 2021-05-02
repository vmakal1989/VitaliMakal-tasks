import { Form } from "mobx-react-form"
import dvr from "mobx-react-form/lib/validators/DVR"
import validatorjs from "validatorjs"
import task from "src/store/task"
import {runInAction} from "mobx"

class TaskForm extends Form {
	plugins() {
		return {
			dvr: dvr(validatorjs)
		};
	}

	setup() {
		return {
			fields: [
				{
					name: "name",
					label: "Name",
					placeholder: "Insert name",
					rules: "required|string"
				},
				{
					name: "description",
					label: "Description",
					placeholder: "Insert description",
					rules: "required|string"
				},
				{
					name: "status",
					label: "Status",
					value: task.state.fields.filter(field => field.label === "Status")[0].options[0]
				},
				{
					name: "importance",
					label: "Importance",
					value: task.state.fields.filter(field => field.label === "Importance")[0].options[0]
				},
				{
					name: "executor",
					label: "Executor"
				}
			]
		};
	}

	hooks() {
		return {
			onSuccess(form) {
				runInAction(()=> task.state.renderTaskForm = !task.state.renderTaskForm)
				task.addTask(form.values())
				form.$('name').clear()
				form.$('description').clear()
			}
		};
	}
}


export default new TaskForm()
