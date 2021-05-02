import React from "react"
import {NavLink} from "react-router-dom"
import {observer} from "mobx-react";

type Props = {
	recipient: string
}

export const UpdateProfile: React.FC<Props> = observer(({recipient}): JSX.Element => {
	return (
		<div className="notice__item">
			<h3 className="notice__system-label">System message</h3>
			<p className="notice__system-text">
				Please update your
				<NavLink to={`/users/${recipient}`} className="notice__system-link">
					&nbsp;profile
				</NavLink>
			</p>
		</div>
	)
})