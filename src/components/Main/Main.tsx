import React from "react"
import task from "src/store/task"
import {observer} from "mobx-react"
import Preloader from "src/components/common/Preloader"
import MainHeader from "./MainHeader"
import TaskForm from "src/components/Forms/TaskForm"
import taskForm from "src/store/taskForm"
import { runInAction } from "mobx"
import TaskList from "src/components/TaskList"

const Main: React.FC = observer((): JSX.Element  => {
	const handleSubmit = (): void => {
		runInAction(()=> task.state.renderTaskForm = !task.state.renderTaskForm)
	}
	return (
		<>
			<MainHeader onClick={handleSubmit}/>
			{ task.state.renderTaskForm && <TaskForm  form={taskForm} exitModalWindow={handleSubmit}/> }
			{
				task.state.isFetching
					?
					<Preloader style={"main__preloader"}/>
					:
					task.state.sections.map((el, index)=> {
						return <TaskList key={index} sectionName={el}/>
					})
			}
		</>
	)
})

export default Main