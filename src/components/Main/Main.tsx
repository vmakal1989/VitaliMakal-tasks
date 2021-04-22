import React from 'react'
import Button from "src/components/common/Button"
import TaskList from "src/components/TaskList"
import tasks from "src/store/Task"

const Main: React.FC = (): JSX.Element => {
	let tasksCount: number = tasks.tasks.length
	return (
		<div className="main">
			<div className="main__header">
				<div className="main__title">You’ve got <span className="scarlet">{tasksCount} task</span> today </div>
				<Button classType={"main"} text={"Add new"} />
			</div>
			{tasks.taskOptions.sections.map((el, index)=> {
				return <TaskList key={index}
								 completed={el === "Completed"}
								 sectionName={el}/>
			})}
		</div>
	)
}

export default Main