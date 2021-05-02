import React from 'react'

type Props = {
	option: string
	onClick: (id: number, type: string, option?: string, ) => void
	taskId: number
	nameParentsItem: string
}

const DotsMenuSubItem: React.FC<Props> = ({option,taskId, nameParentsItem, onClick}): JSX.Element => {
	return (
		<div className="dots-menu__sub-item" onClick={() => onClick(taskId, nameParentsItem, option)}>
			{option}
		</div>
	)
}

export default DotsMenuSubItem