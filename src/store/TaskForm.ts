import { Form } from "mobx-react-form"
import dvr from "mobx-react-form/lib/validators/DVR"
import validatorjs from "validatorjs"

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
					rules: "required|string",
				},
				{
					name: "description",
					label: "Description",
					placeholder: "Insert description",
					rules: "required|string"
				},
				{
					name: "status",
					label: "Status"
				},
				{
					name: "importance",
					label: "Importance"
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
				alert("Form is valid! Send the request here.")
				console.log("Form Values!", form.values())
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