import React from "react"
import {RouteComponentProps, withRouter } from "react-router-dom"

type PathParamsType = {
	id: string
}
const TaskInfo: React.FC<RouteComponentProps<PathParamsType>> = ({match}): JSX.Element => {
	return (
		<div>
			hello
		</div>
	)
}

export default withRouter(TaskInfo)