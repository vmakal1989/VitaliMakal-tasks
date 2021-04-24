import React from "react"
import Button from "src/components/common/Button"
import {ClassType} from "src/components/Forms/Inputs/SimpleInput"
import SimpleInput from "src/components/Forms/Inputs/SimpleInput"

type Props = {
    form: any
}

const RegistrationForm: React.FC<Props> = ({form}): JSX.Element => {

    const classTypes: ClassType = {
		block: "registration-form__item form__item",
		label: "registration-form__label form__label",
		field: "registration-form__field form__field",
		error: "registration-form__error form__error"
	}

    return (
        <form className="registration-form form" onSubmit={form.onSubmit}>
			<h1 className={"registration-form__title form__title"}>Registration</h1>
			<div className="registration-form__items form__items">
				<SimpleInput field={form.$('email')}
							 classTypes={classTypes}
							 type={"email"}/>
				<SimpleInput field={form.$('firstName')}
							 classTypes={classTypes}
							 type={"text"}/>
				<SimpleInput field={form.$('lastName')}
							 classTypes={classTypes}
							 type={"text"}/>
                <SimpleInput field={form.$('password')}
                             classTypes={classTypes}
                              type={"password"}/>
                <SimpleInput field={form.$('passwordConfirm')}
                             classTypes={classTypes}
                             type={"password"}/>
			</div>
			<div className="registration-form__btn-group form__btn-group">
				<Button text={"Submit"} classType={"registration-form__btn-success form__btn-success"} 
					onClick={form.onSubmit} />
				<Button text={"Cancel"} classType={"registration-form__btn-cancel form__btn-cancel"} 
                    onClick={null}/>
			</div>
			<p className="registration-form__error form__error">{form.error}</p>
		</form>
    )
}

export default RegistrationForm