import React from 'react'
import { observer } from 'mobx-react'
import SimpleInput, {ClassType} from 'src/components/Forms/Inputs/SimpleInput'
import Button from 'src/components/common/Button'

type Props = {
	exitModalWindow: () => void
	form: any
}

const TaskForm: React.FC<Props> = observer(({ form, exitModalWindow }): JSX.Element => {

	const classTypes: ClassType = {
		block: "task-form__item",
		label: "task-form__label",
		field: "task-form__field",
		error: "task-form__error"
	}

	return (
		<form className="task-form" onSubmit={form.onSubmit}>
			<h1 className={"task-form__title"}>New Task</h1>
			<div className="task-form__items">
				<SimpleInput field={form.$('name')}
							 classTypes={classTypes}
							 type={"text"}/>
				<SimpleInput field={form.$('description')}
							 classTypes={classTypes}
							 type={"textarea"}/>
				<SimpleInput field={form.$('status')}
							 classTypes={classTypes}
							 type={"select"} options={["In progress", "Pending", "Completed", 'Canceled']}/>
				<SimpleInput field={form.$('importance')}
							 classTypes={classTypes}
							 type={"select"}
							 options={["Minor", "Critical", "Normal"]}/>
				<SimpleInput field={form.$('executor')}
							 classTypes={classTypes}
							 type={"select"}/>
			</div>
			<div className="task-form__btn-group">
				<Button text={"Submit"} classType={"task-form__btn-success"} onClick={form.onSubmit} />
				<Button text={"Cancel"} classType={"task-form__btn-cancel"} onClick={exitModalWindow} />
			</div>
			<p className="task-form__error">{form.error}</p>
		</form>
	)
})
export default TaskForm
