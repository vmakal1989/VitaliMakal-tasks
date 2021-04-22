import React, {useState} from "react"
import Task from "src/components/Task"
import tasks from "src/store/Task"
import {observer} from "mobx-react"
import classNames from "classnames";

type Props = {
	completed: boolean
	sectionName: string
}

const TaskList: React.FC<Props> = observer(({completed, sectionName}): JSX.Element => {
	const [maxRenderActiveTasks, setMaxActiveRenderTasks] = useState<number>(4)
	const [maxRenderCompletedTasks, setMaxCompletedRenderTasks] = useState<number>(4)
	return (
		<div className="main__list">
			<div className={classNames("main__list-title", sectionName === "Completed" ? "completed" : '')}>
				{sectionName}
			</div>
			{
				!completed
				?
				<>
					{
						tasks.getActiveTasks().map((task, index) => {
							if (index < maxRenderActiveTasks) {
								return <Task key={task.id}
											 text={task.description}
											 statusInfoType={task.status}
											 importanceInfoType={task.importance}
											 taskId={task.id}
											 usersId={task.users}/>
							}
						})
					}
					{
						maxRenderActiveTasks < tasks.getActiveTasks().length
							?
							<button className="btn-see-moore"
									  onClick={() =>setMaxActiveRenderTasks(maxRenderActiveTasks + 4)}>
								See more
							</button>
							:
							''
					}
				</>
				:
				<>
					{
						tasks.getCompletedTasks().map((task, index) => {
							if (index < maxRenderCompletedTasks) {
								return <Task key={task.id}
											 text={task.description}
											 statusInfoType={task.status}
											 importanceInfoType={task.importance}
											 taskId={task.id}
											 usersId={task.users}/>
							}
						})

					}
					{
						maxRenderCompletedTasks < tasks.getCompletedTasks().length
							?
							<button className="btn-see-moore"
									onClick={() =>setMaxCompletedRenderTasks(maxRenderCompletedTasks + 4)}>
								See more
							</button>
							:
							''
					}
				</>
			}
		</div>
	)
})

export default TaskList