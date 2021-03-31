import './Button.scss'
import React from 'react'
import classNames from 'classnames'

export const Button = ({onClick, label, className}) => {

	return (
		<button className={classNames('btn', className)} onClick={() => onClick(label)}>
			{label}
		</button>
	)
}