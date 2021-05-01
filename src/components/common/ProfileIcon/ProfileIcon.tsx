import React from "react"
import defaultAvatar from "src/assets/images/defaultProfile.png"
import {User} from "src/types/types"

type Props = {
	classType: string
	user?: User
}

const ProfileIcon: React.FC<Props> = ({classType, user}): JSX.Element => {
	let userPhotoUrl = defaultAvatar
	return (
		<div className={`${classType}__user-avatar`}>
			<img className={`${classType}__user-image`} src={userPhotoUrl} alt="profileImage"/>
		</div>

	)
}

export default ProfileIcon