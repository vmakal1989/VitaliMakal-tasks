import React, {useState} from "react"
import Task from "src/components/TaskList/Task"
import tasks from "src/store/task"
import {observer} from "mobx-react"
import classNames from "classnames"
import Button from "src/components/common/Button"

type Props = {
	sectionName: string
}

const TaskList: React.FC<Props> = observer(({sectionName}): JSX.Element => {
	const [maxRenderActiveTasks, setMaxActiveRenderTasks] = useState<number>(4)

	const handleSubmit  = ():void => {
		setMaxActiveRenderTasks(maxRenderActiveTasks + 4)
	}
	return (
		<div className="main__list">
			<div className={classNames("main__list-title", sectionName === "Completed" ? "completed-img" : '')}>
				{sectionName}
			</div>
			{
				tasks.renderTasks(sectionName).map((task, index) => {
					if (index < maxRenderActiveTasks) {
						return <Task key={task.id}
									 text={task.name}
									 statusInfoType={task.status}
									 importanceInfoType={task.importance}
									 taskId={task.id}
									 users={task.users}
									 haze={sectionName === "Completed" ? "haze" : null}/>
					}
				})
			}
			{
				maxRenderActiveTasks < tasks.renderTasks(sectionName).length
					?
					<Button classType={"btn-see-moore"} element={"See moore"} onClick={handleSubmit}/>
					:
					''
			}
		</div>
	)
})

export default TaskList