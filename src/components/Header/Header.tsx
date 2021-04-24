import React from 'react'
import SearchField from "src/components/Forms/SearchField"
import Notification from "src/components/common/Notification"
import ProfileIcon from "src/components/common/ProfileIcon"

const Header = (): JSX.Element => {
	return (
		<div className='header'>
			<SearchField classType={'header'}/>
			<Notification />
			<ProfileIcon classType={'header'}/>
		</div>
	)
}

export default Header