import React  from "react"
import task from "src/store/Task"
import DotsMenuItem from "./DotsMenuItem";

type Props = {
	taskId: number
}

const DotsMenu: React.FC<Props> = ({taskId}): JSX.Element => {

	const handleSubmit = (id: number, type: string, option?: string): void => {
		task.changeTask(id, type, option)
	}

	return  (
		<div className="dots-menu">
			<div className="dot" />
			<div className="dots-menu__items">
				{task.state.taskOptions.options.map((option, index) => {
					return <DotsMenuItem key={index} option={option} taskId={taskId} onClick={handleSubmit}/>
				})}
			</div>
		</div>
	)
}

export default DotsMenu