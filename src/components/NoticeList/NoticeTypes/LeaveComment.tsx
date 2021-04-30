import React from "react"
import ProfileIcon from "src/components/common/ProfileIcon"
import {NavLink} from "react-router-dom"
import {Task, User} from "src/types/types"

type Props = {
	author: User
	task: Task
	body: string
}

export const LeaveComment: React.FC<Props> = ({author, task, body}): JSX.Element => {
	return (
		<div className="notice__item nowrap">
			<div className="notice__avatar">
				<NavLink to={`/users/${author.id}`}>
					<ProfileIcon classType={"notice"} />
				</NavLink>
			</div>
			<div>
				<div className="notice__name">
					<NavLink to={`/users/${author.id}`}>
						{`${author.firstName} ${author.lastName}`}
					</NavLink>
				</div>
				<div className="notice__text">
					Comment on task&nbsp;
					<NavLink to={`/tasks/${task.id}`} className="notice__text_brilliant bold">
							{task.name}
					</NavLink>
				</div>
				<div className="notice__comment">
					{body}
				</div>
			</div>
		</div>
	)
}