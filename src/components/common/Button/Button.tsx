import React from 'react'
import classNames from "classnames"

type Props = {
	classType: string
	text: string
	onClick: () => void
}

const Button: React.FC<Props> = ({classType, text, onClick}): JSX.Element => {
	return (
		<button className={classNames("btn", classType)} onClick={onClick}>
			<span>
				{text}
			</span>
		</button>
	)
}

export default Button