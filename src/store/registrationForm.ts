import { Form } from "mobx-react-form"
import dvr from "mobx-react-form/lib/validators/DVR"
import validatorjs from "validatorjs"
import user from "src/store/user"
import {firebaseUserAPI} from "src/api/firebase"
import app from "src/store/app"
import {runInAction} from "mobx"

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
					rules: "required|string|min:3"
				},
				{
					name: "lastName",
					label: "Last Name",
					placeholder: "Insert Last Name",
					rules: "required|string|min:3"
				},
				{
					name: "password",
					label: "Password",
					placeholder: "Insert password",
					rules: "required|string|min:6"
				},
				{
					name: "passwordConfirm",
					label: "Confirm",
					placeholder: "Confirm password",
					rules: "required|string|same:password"
				},

			]
		};
	}
	hooks() {
		return {
			async onSuccess(form) {
				runInAction(()=> app.state.formIsFetching = true)
				let {email, firstName, lastName, password} = form.values()
				await firebaseUserAPI.createAccount(email, password)
					.then(data => {
						user.createUser(data.user.uid,email, firstName, lastName)
						form.clear()
						runInAction(()=> app.state.formIsFetching = false)
					})
					.catch(error => {
						form.invalidate(error.message)
						runInAction(()=> app.state.formIsFetching = false)
					})
			}
		}
	}
}
export default new RegistrationForm()
