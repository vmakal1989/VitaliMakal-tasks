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
import user from "src/store/user"
import task from "./store/task"
import Preloader from "src/components/common/Preloader"
import Aside from "./components/Aside"
import notice from "./store/notice"
import TaskInfo from "./components/TaskInfo"
import { withRouter } from "react-router-dom"

const App = observer((): JSX.Element =>  {
	React.useEffect(()=> {
		app.initializeApp().then(()=>{
			user.getUsers()
			task.getTasks()
			notice.getNotices()
		})
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
						<Route path="/tasks/:id" component={TaskInfo}/>
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