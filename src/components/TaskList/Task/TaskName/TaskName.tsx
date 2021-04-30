import React from "react"

type Props = {
	description: string
}

const TaskName: React.FC<Props> = ({description}): JSX.Element => {
	return (
		<div className="task__text">
			{description}
		</div>
	)
}

export default TaskName