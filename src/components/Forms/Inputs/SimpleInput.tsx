import React from "react"
import { observer } from "mobx-react"

type Props = {
	field: any
	classTypes: ClassType
	type: "text" | "textarea" | "select"
	placeholder?: string
	options?: Array<string>
}
export type ClassType = {
	block: string
	label: string
	field: string
	error: string
}

const SimpleInput: React.FC<Props> = observer(({ field, classTypes, type, placeholder = null , options}): JSX.Element => {
	let fieldType: JSX.Element

	switch(type) {
		case "textarea":
			fieldType = <textarea {...field.bind({ type, placeholder }) } className={classTypes.field} />
			break
		case "select":
			fieldType = <select {...field.bind({ type })}className={classTypes.field}>
							{ options && options.map((el, index) => {
								return <option key={index} value={el}>{el}</option>
							}) }
						</select>
			break
		default:
			fieldType = <input {...field.bind({ type, placeholder }) } className={classTypes.field}/>
	}
	return (
		<div className={classTypes.block}>
			<label htmlFor={field.id} className={classTypes.label}>
				{field.label}
			</label>
			{fieldType}
			<p className={classTypes.error}>
				{field.error}
			</p>
		</div>
	)
})

export default SimpleInput
