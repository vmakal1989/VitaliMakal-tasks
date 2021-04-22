import React from 'react'

type Props = {
	classType: string
}

const Input: React.FC<Props> = ({classType}): JSX.Element => {
	return (
		<input className={`${classType}__input`} type="text" placeholder="Search for any training you want "/>
	)
}

export default Input