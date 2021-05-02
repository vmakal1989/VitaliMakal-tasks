import React from "react"
import task from "src/store/task"

type Props = {
	classType: string
}

const SearchField: React.FC<Props> = (props): JSX.Element => {
	let [value, setValue] = React.useState<string>('')

	const changeValue = (e) => {
		setValue(e.target.value)
		task.hotSearch(e.target.value)
	}
	return (
		<input className={`header__input`}
			   value={value} type="text"
			   placeholder="Search for any training you want "
			   onChange={changeValue}/>
	)
}

export default SearchField