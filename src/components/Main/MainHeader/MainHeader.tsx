import React from "react"
import Button from "src/components/common/Button"
import task from "src/store/task"
import {observer} from "mobx-react"

type Props = {
	onClick: () => void
}

const MainHeader: React.FC<Props> = observer(({onClick}): JSX.Element => {
	return (
		<div className="main__header">
			<div className="main__title">You’ve got <span className="scarlet">{ task.state.tasks.length} task</span> today </div>
			<Button classType={"main__btn"} element={"Add new"} onClick={onClick}/>
		</div>
	)
})

export  default MainHeader
