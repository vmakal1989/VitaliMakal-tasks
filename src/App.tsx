import React from "react"
import RegistrationForm from "./components/Forms/RegistrationForm"
import Header from "./components/Header"
import Main from "./components/Main"
import registrationForm from "src/store/registrationForm"
import loginForm from "src/store/loginForm"
import LoginForm from "src/components/Forms/LoginForm"
import { Route, Redirect } from "react-router"
import app from "src/store/app"
import { observer} from "mobx-react"
import Preloader from "src/components/common/Preloader"
import Aside from "./components/Aside"
import TaskPage from "./components/TaskPage"
import { withRouter } from "react-router-dom"
import UserPage from "./components/UserPage"

const App = observer((): JSX.Element =>  {
	React.useEffect(()=> {
		app.initializeApp()
	},[])

	if(app.state.isFetching) return <Preloader style={"app__preloader"}/>

	return (
		<div className='app'>
			{ !app.state.isAuth && <Redirect to='/login' /> }
			{app.state.isAuth &&
				<div className="wrapper">
					<Header/>
					<div className="main">
						<Route exact path="/" component={Main}/>
						<Route path="/tasks/:id" component={TaskPage}/>
						<Route path="/users/:id" component={UserPage}/>
					</div>
					<Aside/>
				</div>
			}
			<Route path="/registration" render={() => <RegistrationForm form={registrationForm}/>}/>
			<Route path="/login" render={() => <LoginForm form={loginForm}/>}/>
		</div>
	)
})

export default withRouter(App)