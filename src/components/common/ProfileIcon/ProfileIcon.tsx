import React from "react"
import defaultAvatar from "src/assets/images/defaultProfile.png"

type Props = {
	classType: string
	src?: string
}

const ProfileIcon: React.FC<Props> = ({classType,src}): JSX.Element => {
	return (
		<div className={`${classType}__user-avatar`}>
			<img className={`${classType}__user-image`} src={src ?  src : defaultAvatar} alt={src ? src : defaultAvatar}/>
		</div>
	)
}

export default ProfileIcon