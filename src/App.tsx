import React from "react"
import RegistrationForm from "./components/Forms/RegistrationForm"
import Header from "./components/Header"
import Main from "./components/Main"
import registrationForm from "src/store/RegistrationForm"
import loginForm from "src/store/LoginForm"
import LoginForm from "src/components/Forms/LoginForm"

const App = (): JSX.Element =>  {
	let render = true
	return (
		<div className='app'>
			{ render && 
			<div className="wrapper">
				<Header /> 
				<Main /> 
			</div>
			}
		</div>
	)
}

export default App