import { Form } from "mobx-react-form"
import dvr from "mobx-react-form/lib/validators/DVR"
import validatorjs from "validatorjs"
import user from "src/store/User"
import app from "src/store/App"
import {firebaseUserAPI} from "src/api/firebase"
import {runInAction} from "mobx"

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
			async onSuccess(form) {
				runInAction(()=> app.state.formIsFetching = true)
				let {email, password} = form.values()
				await firebaseUserAPI.newSession(email,password)
					.then(response => {
						user.loginUser()
						form.clear()
						runInAction(()=> app.state.formIsFetching = false)
					})
					.catch(error => {
						form.invalidate(error.message)
						runInAction(()=> app.state.formIsFetching = false)
					}
				)}
		};
	}
}


export default new LoginForm()
