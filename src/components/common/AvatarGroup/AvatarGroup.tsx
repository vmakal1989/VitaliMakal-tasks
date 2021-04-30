import React, {useState} from 'react'
import ProfileIcon from "src/components/common/ProfileIcon"
import classNames from "classnames"
import {NavLink} from "react-router-dom"

type Props = {
	usersId: Array<string>
}

const AvatarGroup: React.FC<Props> = ({usersId}): JSX.Element => {
	return (
		<div className="avatars">
			{
				usersId.map((userId, index) => {
					if(index < 4 ) return (
						<div key={index} className="avatars__item">
							<NavLink to={`/users/${userId}`}>
								<ProfileIcon key={userId}
											 classType={"task"}
											 userId={userId}/>
							</NavLink>
						</div>
					)
				})
			}
			{
				usersId.length > 4
					?
					<div className="avatars__hidden-items">
						+{usersId.length - 4}
							<div className={classNames(`avatars__hidden-container`)}>
								{usersId.map((userId, index) => {
									if(index >= 4 ) return (
										<div key={index} className="avatars__hidden-item">
											<NavLink to={`/users/${userId}`}>
												<ProfileIcon key={userId}
															 classType={"task"}
															 userId={userId}/>
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