import React from "react"
import {NavLink, RouteComponentProps, withRouter } from "react-router-dom"
import {observer} from "mobx-react"
import task from "src/store/task"
import Preloader from "src/components/common/Preloader"
import classNames from "classnames"
import { styles } from "src/helpers/withStyles/colorOptions"
import CommentForm from "src/components/Forms/CommentForm"
import CommentList from "src/components/CommentList"

type PathParamsType = {
	id: string
}
const TaskPage: React.FC<RouteComponentProps<PathParamsType>> = observer(({match}): JSX.Element => {
	React.useEffect(()=> {
		const { pathname } = location
		task.getTask(match.params.id)
	},[location.pathname])


	if(task.state.isFetching || !task.state.task) return <Preloader style={"task-info__preloader"} />

	return (
		<div className="task-info">
			<div className="task-info__return">
				<NavLink to="/">
					back
				</NavLink>
			</div>
			{
				task.state.task === "404"
					? <div className="not-found"/>
					:
					<>
						<div className="task-info__name">
							{task.state.task.name}
						</div>
						<div className="task-info__description">
							{task.state.task.description}
						</div>
						<div className="task-info__list">
							<div className="task-info__item">
								Status:&nbsp;
								<span className={classNames("bold", styles[task.state.task.status])}>
                                    {task.state.task.status}
                                </span>
							</div>
							<div className="task-info__item">
								Importance: &nbsp;
								<span className={classNames("bold", styles[task.state.task.importance])}>
                                    {task.state.task.importance}
                                </span>
							</div>
							<div className="task-info__item">
								Author: &nbsp;
								<span className="bold task-info__user-name">
                                    <NavLink to={`/users/${task.state.task.users[1]}`}>
                                        {`${task.state.task.users[1].firstName} ${task.state.task.users[1].firstName}`}
                                    </NavLink>
                                </span>
							</div>
							<div className="task-info__item ">
								Execute: &nbsp;
								<span className="bold task-info__user-name">
                                    <NavLink to={`/users/${task.state.task.users[0]}`}>
                                        {`${task.state.task.users[0].firstName} ${task.state.task.users[0].firstName}`}
                                    </NavLink>
                                </span>
							</div>
						</div>
						<div className="task-info__comment">
							<div className="task-info__comment-label">
								Comments.
							</div>
							<CommentForm style={"task-info__form"} task={task.state.task}/>
							<CommentList style={"task-info"} taskId={task.state.task.id}/>
						</div>
					</>
			}
		</div>
	)
})

export default withRouter(TaskPage)