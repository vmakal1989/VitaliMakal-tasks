import './RangeField.scss'
import React from 'react'
import classNames from "classnames"
import store from "../../state/mobxState"

export const RangeField = ({label, range, className}) => {
	return (
		<>
			<div className={'range-field__label'}>
				{label}:
			</div>
			<input className={classNames('range-field__input', className)} type="range" min={store.minRange} max={store.maxRange} value={range} disabled/>
		</>
		)
}