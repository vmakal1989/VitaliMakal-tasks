import React from 'react'
import classNames from "classnames";

type Props = {
	type: "In progress" | "Pending" | "Completed" | 'Canceled'
}

const StatusInformation: React.FC<Props> = ({type}): JSX.Element => {

	const withStyle = {
		"Pending": "orange",
		"In progress": "blue",
		"Completed": "green",
		'Canceled': "red"
	}

	return (
		<div className={classNames(`status-information status-information_${withStyle[type]}`)}>
			{type}
		</div>
	)
}

export default StatusInformation