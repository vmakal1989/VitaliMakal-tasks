import React from 'react'
import classNames from "classnames"

type Props = {
	classType: string
	element: string | JSX.Element
	onClick: () => void
	disabled?: boolean
}

const Button: React.FC<Props> = ({classType, element, onClick, disabled=false}): JSX.Element => {
	return (
		<button className={classNames("btn", classType)} onClick={onClick} disabled={disabled}>
			<span>
				{element}
			</span>
		</button>
	)
}

export default Button