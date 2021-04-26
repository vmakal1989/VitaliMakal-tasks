import React from "react"
import defaultAvatar from "src/assets/images/defaultProfile.png"
import user from "src/store/User"

type Props = {
	classType: string
	userId?: string
}

const ProfileIcon: React.FC<Props> = ({classType, userId}): JSX.Element => {
	let userPhotoUrl = defaultAvatar
	return (
		<div className={`${classType}__user-avatar`}>
			<img className={`${classType}__user-image`} src={userPhotoUrl} alt="profileImage"/>
		</div>

	)
}

export default ProfileIcon