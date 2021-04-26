import React from 'react'
import { observer } from 'mobx-react'
import SimpleInput, {ClassType} from 'src/components/Forms/Inputs/SimpleInput'
import Button from 'src/components/common/Button'
import task from "src/store/Task"
import user from "src/store/User"
import {Option} from "src/components/Forms/Inputs/SimpleInput"

type Props = {
	exitModalWindow: () => void
	form: any
}

const getOptionsArray = (key: string, task: any): Array<Option> => {
	let optionsArr: Array<Option> = []
	task.state.fields.map(field => {
		if( field.label === key) 
			field.options.map(option => optionsArr.push({label: option, value: option})) 
	})
	return optionsArr
}


const TaskForm: React.FC<Props> = observer(({ form, exitModalWindow }): JSX.Element => {

	let statusOptions: Array<Option> = getOptionsArray("Status", task)
	let importanceOptions: Array<Option> = getOptionsArray("Importance", task)
	let	usersOptions: Array<Option> = user.state.users.map(user => {
		return {label: `${user.firstName} ${user.lastName}`, value: user.id}
	})
	
	const classTypes: ClassType = {
		block: "task-form__item form__item",
		label: "task-form__label form__label",
		field: "task-form__field form__field",
		error: "task-form__error form__error"
	}

	return (
		<form className="task-form form" onSubmit={form.onSubmit}>
			<h1 className={"task-form__title form__title"}>New Task</h1>
			<div className="task-form__items form__items">
				<SimpleInput field={form.$('name')}
							 classTypes={classTypes}
							 type={"text"}/>
				<SimpleInput field={form.$('description')}
							 classTypes={classTypes}
							 type={"textarea"}/>
				<SimpleInput field={form.$('status')}
							 classTypes={classTypes}
							 type={"select"} options={statusOptions}/>
				<SimpleInput field={form.$('importance')}
							 classTypes={classTypes}
							 type={"select"}
							 options={importanceOptions}/>
				<SimpleInput field={form.$('executor')}
							 classTypes={classTypes}
							 type={"select"} 
							 options={usersOptions}/>
			</div>
			<div className="task-form__btn-group form__btn-group">
				<Button element={"Submit"} classType={"task-form__btn-success form__btn-success"} 
					onClick={form.onSubmit} />
				<Button element={"Cancel"} classType={"task-form__btn-cancel form__btn-cancel"} 
					onClick={exitModalWindow} />
			</div>
			<p className="task-form__error form__error">{form.error}</p>
		</form>
	)
})
export default TaskForm
