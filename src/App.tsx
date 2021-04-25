import React from "react"
import RegistrationForm from "./components/Forms/RegistrationForm"
import Header from "./components/Header"
import Main from "./components/Main"
import registrationForm from "src/store/RegistrationForm"
import loginForm from "src/store/LoginForm"
import LoginForm from "src/components/Forms/LoginForm"
import { Switch, Route } from "react-router"
import firebase from 'firebase'

const App = (): JSX.Element =>  {
	React.useEffect(()=> {
        firebase.auth().onAuthStateChanged((user) => {
			console.log(user)
		})
    },[])
	return (
		<div className='app'>
			<Switch>
				<Route exact path="/">
					<div className="wrapper">
						<Header />
						<Main />
					</div>
				</Route>
				<Route path="/registration">
					<RegistrationForm form={registrationForm}/>
				</Route>
				<Route path="/login">
					<LoginForm form={loginForm}/>
				</Route>
			</Switch>
		</div>
	)
}

export default App