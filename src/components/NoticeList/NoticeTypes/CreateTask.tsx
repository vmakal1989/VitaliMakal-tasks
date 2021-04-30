import React from "react"
import {NavLink} from "react-router-dom"
import {Task, User } from "src/types/types"
import ProfileIcon from "src/components/common/ProfileIcon"

type Props = {
	author: User
	task: Task
	executor: User
}

export const CreateTask: React.FC<Props> = ({author,executor, task}): JSX.Element => {
	return (
		<div className="notice__item nowrap">
			<div className="notice__avatar">
				<ProfileIcon classType={"notice"} />
			</div>
			<div>
				<div className="notice__name">
					<NavLink to={`/users/${author.id}`} className="notice__name-link">
						{`${author.firstName} ${author.lastName}`}
					</NavLink>
				</div>
				<div className="notice__text">
					Created a new task&nbsp;
					<NavLink to={`/tasks/${task.id}`} className="notice__text-link notice__text_yellow">
						&nbsp;'{task.name}'
					</NavLink>
					&nbsp;and chose the executor:
					<NavLink to={`/users/${executor.id}`} className="notice__text-link notice__text_brilliant">
						&nbsp;&nbsp;{`${executor.firstName} ${executor.lastName}`}
					</NavLink>
				</div>
			</div>
		</div>
	)
}