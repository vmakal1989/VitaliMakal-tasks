import React, {useState} from 'react'
import ProfileIcon from "src/components/common/ProfileIcon"
import classNames from "classnames"
import {NavLink} from "react-router-dom"
import {User} from "src/types/types"

type Props = {
	users: Array<User>
}

const AvatarGroup: React.FC<Props> = ({users}): JSX.Element => {
	return (
		<div className="avatars">
			{
				users.map((user, index) => {
					if(index < 4 ) return (
						<div key={index} className="avatars__item">
							<NavLink to={`/users/${user.id}`}>
								<ProfileIcon key={user.id}
											 classType={"task"}
											 user={user}/>
							</NavLink>
						</div>
					)
				})
			}
			{
				users.length > 4
					?
					<div className="avatars__hidden-items">
						+{users.length - 4}
							<div className={classNames(`avatars__hidden-container`)}>
								{users.map((user, index) => {
									if(index >= 4 ) return (
										<div key={index} className="avatars__hidden-item">
											<NavLink to={`/users/${user.id}`}>
												<ProfileIcon key={user.id}
															 classType={"task"}
															 user={user}/>
											</NavLink>
										</div>
									)
								})}
							</div>
					</div>
					:
					''
			}
		</div>
	)
}

export default AvatarGroup