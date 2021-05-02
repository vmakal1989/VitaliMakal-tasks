import React from "react"
import {observer} from "mobx-react"
import {CreateTask} from "./NoticeTypes/CreateTask"
import {UpdateTask} from "./NoticeTypes/UpdateTask"
import {UpdateProfile} from "./NoticeTypes/UpdateProfile"
import {LeaveComment} from "./NoticeTypes/LeaveComment"
import notice from "src/store/notice"
import { RemoveTask } from "./NoticeTypes/RemoveTask"

const NoticeList: React.FC = observer((): JSX.Element => {
	return (
		<div className="notice__list">
			{
				notice.renderNotices().map(notice => {
					switch(notice.type) {
						case "CreateTask":
							return <CreateTask key={notice.id}
											   author={notice.author}
											   task={notice.task}
											   executor={notice.executor}/>
						case "UpdateTask":
							return <UpdateTask key={notice.id}
											   task={notice.task}
											   author={notice.author}
											   keyWord={notice.keyWord}/>
						case "RemoveTask":
							return <RemoveTask key={notice.id}
											   author={notice.author}
											   task={notice.task}/>
						case "UpdateProfile":
							return <UpdateProfile key={notice.id}
												  recipient={notice.recipient}/>
						case "LeaveComment":
							return <LeaveComment key={notice.id}
												 author={notice.author}
												 task={notice.task}
												 body={notice.body}/>
						default: break
					}
				})
			}
		</div>
	)
})

export default NoticeList