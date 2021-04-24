import { Form } from "mobx-react-form"
import dvr from "mobx-react-form/lib/validators/DVR"
import validatorjs from "validatorjs"
import task from "src/store/Task"
import user from "src/store/User"

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
					label: "Executor",
					value: user.state.users.filter((el, index) => index === 0)[0].name
				}


			]
		};
	}

	hooks() {
		return {
			onSuccess(form) {
				task.state.renderTaskForm = !task.state.renderTaskForm
				task.addTask(form.values())
				form.reset()
			},
			onError(form) {
				alert("Form has errors!");
				console.log("All form errors", form.errors())
			}
		};
	}
}


export default new TaskForm()

export type TaskFormType = {
	form: typeof TaskForm
}