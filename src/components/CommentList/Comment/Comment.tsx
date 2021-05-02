import React from "react"
import {User} from "src/types/types"
import {NavLink} from "react-router-dom"
import ProfileIcon from "src/components/common/ProfileIcon"
import userStore from "src/store/user";

type Props = {
	body: string
	author: User
}

const Comment: React.FC<Props> = ({body, author}): JSX.Element => {
	return (
		<div className="comment__item">
			<div className="comment__avatar">
				<NavLink to={`/users/${author.id}`}>
					<ProfileIcon classType={"comment"} src={userStore.getUserAvatar(author.id)}/>
				</NavLink>
			</div>
			<div>
				<div className="comment__name">
					<NavLink to={`/users/${author.id}`} className="comment__name-link">
						{`${author.firstName} ${author.lastName}`}
					</NavLink>
				</div>
				<div className="comment__text">
					{body}
				</div>
			</div>
		</div>
	)
}

export default Comment