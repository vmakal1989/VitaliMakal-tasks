import React from  "react"
import DotsMenuSubItem from "src/components/common/DotsMenu/DotsMenuSubItem"

type Props = {
	option: object
	taskId: number
	onClick: (id: number, type: string, option?: string, ) => void
}

const DotsMenuItem: React.FC<Props> = ({option, taskId, onClick}): JSX.Element => {

	const hasSubItems = Array.isArray(option[Object.keys(option)[0]])
	const nameItem = Object.keys(option)[0]

	return (
		<div className="dots-menu__item" onClick={() => !hasSubItems && onClick(taskId, Object.keys(option)[0])}>
			{nameItem}
			<div className="dots-menu__sub-items">
				{
					hasSubItems	&&
						option[Object.keys(option)[0]].map((subOption, index) => {
							return <DotsMenuSubItem key={index}
													subOption={subOption}
													taskId={taskId}
													nameParentsItem={nameItem}
													onClick={onClick}/>
						})
				}
			</div>
		</div>
	)
}

export default DotsMenuItem