import React from "react"
import TextareaAutosize from "react-autosize-textarea/lib"
import Button from "src/components/common/Button"
import comment from "src/store/comment"
import {Task} from "src/types/types"

type props = {
	style: string
	task: Task
}

const CommentForm: React.FC<props> = ({style, task}): JSX.Element => {
	const [value, setValue] = React.useState<string>("")
	const changeValue = (e: React.ChangeEvent<HTMLTextAreaElement>): void => setValue(e.target.value)
	const resetValue = (): void =>  setValue("")
	const addComment = (): void => {
		if(value) {
			comment.addComment(value, task)
			setValue("")
		}
	}

	return (
		<div className={style}>
		<TextareaAutosize value={value} className={`${style}-textarea`} onChange={changeValue} placeholder={"Leave a comment..."} />
		{
			value &&
				<div className={`${style}-btn-list`}>
					<Button classType={`${style}-btn`} element={"Reset"} onClick={resetValue}/>
					<Button classType={`${style}-btn`} element={"Submit"} onClick={addComment}/>
				</div>
		}
		</div>
	)
}

export default CommentForm