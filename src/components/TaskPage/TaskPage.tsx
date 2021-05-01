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
		task.getTask(match.params.id)
	},[location.pathname])


	if(task.state.isFetching || !task.state.task) return <Preloader style={"task-page__preloader"} />

	return (
		<div className="task-page">
			<div className="task-page__return">
				<NavLink to="/">
					back
				</NavLink>
			</div>
			{
				task.state.task === "404"
					? <div className="not-found"/>
					:
					<>
						<div className="task-page__name">
							{task.state.task.name}
						</div>
						<div className="task-page__description">
							{task.state.task.description}
						</div>
						<div className="task-page__list">
							<div className="task-page__item">
								Status:&nbsp;
								<span className={classNames("bold", styles[task.state.task.status])}>
                                    {task.state.task.status}
                                </span>
							</div>
							<div className="task-page__item">
								Importance: &nbsp;
								<span className={classNames("bold", styles[task.state.task.importance])}>
                                    {task.state.task.importance}
                                </span>
							</div>
							<div className="task-page__item">
								Author: &nbsp;
								<span className="bold task-page__user-name">
                                    <NavLink to={`/users/${task.state.task.users[1].id}`}>
                                        {`${task.state.task.users[1].firstName} ${task.state.task.users[1].firstName}`}
                                    </NavLink>
                                </span>
							</div>
							<div className="task-page__item ">
								Execute: &nbsp;
								<span className="bold task-page__user-name">
                                    <NavLink to={`/users/${task.state.task.users[0].id}`}>
                                        {`${task.state.task.users[0].firstName} ${task.state.task.users[0].firstName}`}
                                    </NavLink>
                                </span>
							</div>
						</div>
						<div className="task-page__comment">
							<div className="task-page__comment-label">
								Comments.
							</div>
							<CommentForm style={"task-page__form"} task={task.state.task}/>
							<CommentList style={"task-page"} taskId={task.state.task.id}/>
						</div>
					</>
			}
		</div>
	)
})

export default withRouter(TaskPage)