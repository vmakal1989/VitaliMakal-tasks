import React from 'react'
import SearchField from "src/components/SearchField"
import Notification from "../common/Notification"
import ProfileIcon from "../common/ProfileIcon";

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