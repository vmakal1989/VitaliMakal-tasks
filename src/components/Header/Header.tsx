import React from 'react'
import SearchField from "src/components/Forms/SearchField"
import Notification from "src/components/common/Notification"
import ProfileIcon from "src/components/common/ProfileIcon"
import { NavLink } from 'react-router-dom'
import user from "src/store/user"
import { observer } from 'mobx-react'

const Header = observer((): JSX.Element => {
	return (
		<div className='header'>
			<SearchField classType={'header'}/>
			<NavLink to="#" className="header__link-out" onClick={user.logOutUser}/>
			<Notification />
			<NavLink to={`/users/${user.state.currentUser && user.state.currentUser.id}`} >
				<ProfileIcon classType={'header'} src={user.state.currentUser && user.state.currentUser.avatar} />
			</NavLink>
		</div>
	)
})

export default Header