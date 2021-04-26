import React from "react"
import RegistrationForm from "./components/Forms/RegistrationForm"
import Header from "./components/Header"
import Main from "./components/Main"
import registrationForm from "src/store/RegistrationForm"
import loginForm from "src/store/LoginForm"
import LoginForm from "src/components/Forms/LoginForm"
import { Switch, Route, Redirect } from "react-router"
import app from "src/store/App"
import { observer} from "mobx-react"
import user from "src/store/User"
import task from "./store/Task"

const App = observer((): JSX.Element =>  {
	React.useEffect(()=> {
        app.initializeApp()
		user.getUsers()
		task.getTasks()
    },[])
	
	if(app.state.isFetching) return <div className='app'>Preloader</div>

	return (
		<div className='app'>
			{ !app.state.isAuth && <Redirect to={'/login'} /> }
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
})

export default App