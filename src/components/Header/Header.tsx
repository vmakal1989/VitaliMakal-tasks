import React from 'react'
import SearchField from "src/components/Forms/SearchField"
import Notification from "src/components/common/Notification"
import ProfileIcon from "src/components/common/ProfileIcon"
import { NavLink } from 'react-router-dom'
import user from "src/store/user"

const Header = (): JSX.Element => {
	return (
		<div className='header'>
			<SearchField classType={'header'}/>
			<NavLink to="#" className="header__link-out" onClick={user.logOutUser}/>
			<Notification />
			<ProfileIcon classType={'header'}/>
		</div>
	)
}

export default Header