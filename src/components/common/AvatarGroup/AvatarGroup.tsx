import React from 'react'
import ProfileIcon from "src/components/common/ProfileIcon";

const AvatarGroup: React.FC = (): JSX.Element => {
	return (
		<div className="avatar-group">
			<ProfileIcon classType="post" />
			<ProfileIcon classType="post" />
		</div>
	)
}

export default AvatarGroup