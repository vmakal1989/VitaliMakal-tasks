import React from 'react'

type Props = {
	classType: 'main' | 'form'
	text: string
	onClick: () => void
}

const Button: React.FC<Props> = ({classType, text, onClick}): JSX.Element => {
	return (
		<button className={`${classType}__btn`} onClick={onClick}>
			<span>
				{text}
			</span>
		</button>
	)
}

export default Button