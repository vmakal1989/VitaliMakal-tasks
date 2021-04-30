import React from "react"
import ProfileIcon from "src/components/common/ProfileIcon"
import {NavLink} from "react-router-dom"
import notice from "src/store/notice"
import {Task, User} from "src/types/types"

type Props = {
	author: User
	task: Task
}

export const RemoveTask: React.FC<Props> = ({author, task}): JSX.Element => {
	return (
		<div className="notice__item nowrap">
			<div className="notice__avatar">
				<ProfileIcon classType={"notice"} />
			</div>
			<div>
				<div className="notice__name">
					<NavLink to={`/users/${author.id}`}>
						{`${author.firstName} ${author.lastName}`}
					</NavLink>
				</div>
				<div className="notice__text">
					Remove task:
					<NavLink to={`/tasks/${task.id}`} className="notice__text-link notice__text_yellow bold">
						&nbsp;{task.name}
					</NavLink>
				</div>
			</div>
		</div>
	)
}