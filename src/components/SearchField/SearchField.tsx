import React from "react"
import Input from "../common/Input"

type Props = {
	classType: string
}

const SearchField: React.FC<Props> = (props): JSX.Element => {
	return (
		<Input {...props}/>
	)
}

export default SearchField