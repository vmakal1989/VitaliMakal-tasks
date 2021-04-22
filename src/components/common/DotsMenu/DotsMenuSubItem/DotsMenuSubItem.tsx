import React from 'react'

type Props = {
	subOption: string
	onClick: (id: number, type: string, option?: string, ) => void
	taskId: number
	nameParentsItem: string
}

const DotsMenuSubItem: React.FC<Props> = ({subOption,taskId, nameParentsItem, onClick}): JSX.Element => {
	return (
		<div className="dots-menu__sub-item" onClick={() => onClick(taskId, nameParentsItem, subOption)}>
			{subOption}
		</div>
	)
}

export default DotsMenuSubItem