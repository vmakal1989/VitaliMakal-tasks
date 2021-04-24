import React from "react"
import Button from "src/components/common/Button"
import TaskList from "src/components/TaskList"
import task from "src/store/Task"
import TaskForm from "src/components/Forms/TaskForm"
import {observer} from "mobx-react"
import form from "src/store/TaskForm"

const Main: React.FC = observer((): JSX.Element  => {
	const handleSubmit = (): void => {
		task.state.renderTaskForm = !task.state.renderTaskForm
	}
	let tasksCount: number = task.state.tasks.length
	return (
		<div className="main">
			<div className="main__header">
				<div className="main__title">You’ve got <span className="scarlet">{tasksCount} task</span> today </div>
				<Button classType={"main__btn"} text={"Add new"} onClick={handleSubmit}/>
				{ task.state.renderTaskForm && <TaskForm  form={form} exitModalWindow={handleSubmit}/> }
			</div>
			{task.state.taskOptions.sections.map((el, index)=> {
				return <TaskList key={index}
								 completed={el === "Completed"}
								 sectionName={el}/>
			})}
		</div>
	)
})

export default Main