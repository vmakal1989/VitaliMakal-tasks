import React from 'react'
import StatusInformation from "src/components/common/StatusInformation"
import ImportanceInfo from "src/components/common/ImportanceInfo"
import AvatarGroup from "src/components/common/AvatarGroup"
import DotsMenu from "src/components/common/DotsMenu"
import TaskName from "./TaskName"
import classNames from "classnames"
import {NavLink} from "react-router-dom"
import {User} from "src/types/types"

type Props = {
	text: string
	statusInfoType: "In progress" | "Pending" | "Completed" | 'Canceled'
	importanceInfoType: "Minor" | "Critical" | "Normal"
	taskId: number
	users: Array<User>
	haze?: "haze"
}

const Task: React.FC<Props> = ({text, statusInfoType, importanceInfoType, taskId, users, haze}): JSX.Element => {
	return (
		<div className={classNames("task", haze && haze)}>
			<NavLink to={`/tasks/${taskId}`}>
				<TaskName description={text} />
			</NavLink>
			<StatusInformation type={statusInfoType}/>
			<ImportanceInfo type={importanceInfoType} />
			<AvatarGroup users={users}/>
			<DotsMenu taskId={taskId}/>
		</div>
	)
}

export default  Task