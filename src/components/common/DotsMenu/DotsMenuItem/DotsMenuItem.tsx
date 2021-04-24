import React from  "react"
import DotsMenuSubItem from "src/components/common/DotsMenu/DotsMenuSubItem"

type Props = {
	field: Field
	taskId: number
	onClick: (id: number, type: string, option?: string, ) => void
}
type Field = {
	label: string
	options?: Array<string>
}

const DotsMenuItem: React.FC<Props> = ({field, taskId, onClick}): JSX.Element => {

	return (
		<div className="dots-menu__item" onClick={() => !field.options && onClick(taskId, field.label)}>
			{field.label}
			<div className="dots-menu__sub-items">
				{
					field.options	&&
						field.options.map((option, index) => {
							return <DotsMenuSubItem key={index}
													option={option}
													taskId={taskId}
													nameParentsItem={field.label}
													onClick={onClick}/>
						})
				}
			</div>
		</div>
	)
}

export default DotsMenuItem