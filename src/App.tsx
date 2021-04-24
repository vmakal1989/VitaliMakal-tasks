import React from "react"
import RegistrationForm from "./components/Forms/RegistrationForm"
import Header from "./components/Header"
import Main from "./components/Main"
import registrationForm from "src/store/RegistrationForm"

const App = (): JSX.Element =>  {
	let render = false
	return (
		<div className='app'>
			<RegistrationForm form={registrationForm}/>
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