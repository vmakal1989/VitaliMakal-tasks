import React from "react"
import ProfileIcon from "src/components/common/ProfileIcon"
import {NavLink} from "react-router-dom"

type Props = {
	userId: string
	taskId: string
	body?: string
}

export const LeaveComment: React.FC<Props> = ({userId, taskId, body}): JSX.Element => {
	let userName = "Vitali Makal"
	return (
		<div className="notice__item nowrap">
			<div className="notice__avatar">
				<NavLink to={`/users/${userId}`}>
					<ProfileIcon classType={"notice"} />
				</NavLink>
			</div>
			<div>
				<div className="notice__name">
					{userName}
				</div>
				<div className="notice__text">
					Comment on your task UI Design
				</div>
				<div className="notice__comment">
					{body}
				</div>
			</div>
		</div>
	)
}