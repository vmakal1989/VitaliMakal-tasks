import React from "react"
import ProfileIcon from "src/components/common/ProfileIcon"
import {NavLink} from "react-router-dom"
import notice from "src/store/notice"
import {Task, User} from "src/types/types"

type Props = {
	author: User
	task: Task
	keyWord: Array<string>
}

export const UpdateTask: React.FC<Props> = ({author, task, keyWord}): JSX.Element => {
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
					Changed <span className="notice__text_blue bold">{keyWord[0]} </span>
					to <span className="notice__text_green bold" >{keyWord[1]} </span>in
					<NavLink to={`/tasks/${task.id}`} className="notice__text-link notice__text_yellow bold">
						&nbsp;{task.name}
					</NavLink>
				</div>
			</div>
		</div>
	)
}