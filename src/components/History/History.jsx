import React from 'react'
import './History.scss'
import store from "../../state/mobxState"


export const History = () => {

	let historyMap = store.history.map( el => <li className={'history__item'}>{el}</li>)

	return (
		<div className={'history wrapper'}>
			<ul className={'history__items'}>
				{historyMap}
			</ul>
		</div>
	)
}