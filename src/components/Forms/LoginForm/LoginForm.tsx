import React from "react"
import Button from "src/components/common/Button"
import {ClassType} from "src/components/Forms/Inputs/SimpleInput"
import SimpleInput from "src/components/Forms/Inputs/SimpleInput"

type Props = {
    form: any
}

const RegistrationForm: React.FC<Props> = ({form}): JSX.Element => {

    const classTypes: ClassType = {
		block: "login-form__item form__item",
		label: "login-form__label form__label",
		field: "login-form__field form__field",
		error: "login-form__error form__error"
	}

    return (
        <form className="login-form form" onSubmit={form.onSubmit}>
			<h1 className={"login-form__title form__title"}>Log In</h1>
			<div className="login-form__items form__items">
				<SimpleInput field={form.$('email')}
							 classTypes={classTypes}
							 type={"email"}/>
				<SimpleInput field={form.$('password')}
							 classTypes={classTypes}
							 type={"password"}/>
			</div>
			<div className="login-form__btn-group form__btn-group">
				<Button text={"Submit"} classType={"login-form__btn-success form__btn-success"} 
					onClick={form.onSubmit} />
				<Button text={"Cancel"} classType={"login-form__btn-cancel form__btn-cancel"} 
                    onClick={null}/>
			</div>
			<p className="login-form__error form__error">{form.error}</p>
		</form>
    )
}

export default RegistrationForm