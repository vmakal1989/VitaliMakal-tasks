import { Form } from "mobx-react-form"
import dvr from "mobx-react-form/lib/validators/DVR"
import validatorjs from "validatorjs"

class RegistrationForm extends Form {
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
					name: "firstName",
					label: "First Name",
					placeholder: "Insert First Name",
					rules: "required|string|min:6"
				},
				{
					name: "lastName",
					label: "Last Name",
					placeholder: "Insert Last Name",
					rules: "required|string|min:6"
				},
				{
                    name: "password",
					label: "Password",
					placeholder: "Insert password",
					rules: "required|string|min:6"
				},
				{
					name: "passwordConfirm",
					label: "Password Confirmation",
                    placeholder: "Confirm password",
					rules: "required|string|same:password"
				},

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


export default new RegistrationForm()
