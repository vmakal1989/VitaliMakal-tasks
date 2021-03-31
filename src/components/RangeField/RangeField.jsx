import './RangeField.scss'
import React from 'react'
import classNames from "classnames"

export const RangeField = ({label, range, className}) => {
	return (
		<>
			<div className={'range-field__label'}>
				{label}:
			</div>
			<input className={classNames('range-field__input', className)} type="range" min={0} max={200} value={range} disabled/>
		</>
		)

}