import { observer } from "mobx-react"
import React from "react"
import comment from "src/store/comment"
import Comment from "./Comment"

type Props = {
	taskId: string
	style: string
}

const CommentList: React.FC<Props> = observer(({taskId, style}): JSX.Element => {
	React.useEffect(() => {
		comment.getComments(taskId)
	},[])
	return (
		<div className={`${style}__comment-list`}>
			{comment.state.comments.map(comment => {
				return <Comment key={comment.id}
								body={comment.body}
								author={comment.author}/>
			})}
		</div>
	)
})
export default CommentList