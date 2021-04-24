import { Form } from "mobx-react-form"
import dvr from "mobx-react-form/lib/validators/DVR"
import validatorjs from "validatorjs"

class LoginForm extends Form {
	plugins() {
		return {
			dvr: dvr(validatorjs)
		};
	}

	setup() {
		return {
			fields: [
                {
					name: "email",
					label: "Email",
					placeholder: "Insert Email",
					rules: "required|email"
				},
				{
					name: "password",
					label: "Password",
					placeholder: "Insert Password",
					rules: "required|string|min:6"
				}
			]
		};
	}

	hooks() {
		return {
			onSuccess(form) {
			    console.log(form.values())
			},
			onError(form) {
				alert("Form has errors!");
				console.log("All form errors", form.errors())
			}
		};
	}
}


export default new LoginForm()
