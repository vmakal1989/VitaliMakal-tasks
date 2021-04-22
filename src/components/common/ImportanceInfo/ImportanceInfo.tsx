import React from "react"
import classNames from "classnames"

type Props = {
	type: "Minor" | "Critical" | "Normal"
}

const ImportanceInfo: React.FC<Props> = ({type}): JSX.Element => {

	const withStyle = {
		"Minor": "green",
		"Normal": "yellow",
		"Critical": "red"
	}

	return (
		<div className={classNames(`meaning-info meaning-info_${withStyle[type]}`)}>
			{type}
		</div>
	)
}

export default ImportanceInfo