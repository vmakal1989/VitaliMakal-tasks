import React from 'react'
import StatusInformation from "src/components/common/StatusInformation"
import ImportanceInfo from "src/components/common/ImportanceInfo"
import AvatarGroup from "src/components/common/AvatarGroup"
import DotsMenu from "src/components/common/DotsMenu"
import TaskDescription from "./TaskDescription"
import classNames from "classnames";

type Props = {
	text: string
	statusInfoType: "In progress" | "Pending" | "Completed" | 'Canceled'
	importanceInfoType: "Minor" | "Critical" | "Normal"
	taskId: number
	usersId: Array<number>
	haze?: "haze"
}

const Task: React.FC<Props> = ({text, statusInfoType, importanceInfoType, taskId, usersId, haze}): JSX.Element => {
	return (
		<div className={classNames("task", haze && haze)}>
			<TaskDescription description={text} />
			<StatusInformation type={statusInfoType}/>
			<ImportanceInfo type={importanceInfoType} />
			<AvatarGroup usersId={usersId}/>
			<DotsMenu taskId={taskId}/>
		</div>
	)
}

export default  Task