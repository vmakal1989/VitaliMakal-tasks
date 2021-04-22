import React from 'react'

type Props = {
	classType: 'main' | 'form'
	text: string
}

const Button: React.FC<Props> = ({classType, text}): JSX.Element => {
	return (
		<button className={`${classType}__btn`}><span>{text}</span></button>
	)
}

export default Button