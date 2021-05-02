import { observer } from "mobx-react";
import React  from "react"
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom"
import user from "src/store/user"
import Preloader from "src/components/common/Preloader"
import ProfileIcon from "src/components/common/ProfileIcon"
import Button from "src/components/common/Button"

type PathParamsType = {
    id: string
}

const UserPage: React.FC<RouteComponentProps<PathParamsType>> = observer(({match}): JSX.Element => {
    const [image, setImage] = React.useState<File>(null)
    const [imageURl, setImageURL] = React.useState<string>(null)

    React.useEffect(()=> {
        user.getUser(match.params.id)
    },[location.pathname])

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement> ): void => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
            setImageURL(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleSubmit = (): void => {
        user.setAvatar(image, user.state.user.id)
        setImage(null)
    }
    if(user.state.isFetching || !user.state.user) return <Preloader style={"user-page__preloader"} />

    return (
        <div className="user-page">
            <div className="user-page__return">
                <NavLink to="/">
                    back
                </NavLink>
            </div>
            {
                user.state.user === "404"
                    ? <div className="not-found"/>
                    :
                    <>
                        <div className="user-page__title">
                            {`${user.state.user.firstName} ${user.state.user.lastName}`}
                        </div>
                        <div className="user-page__avatar-container">
                            {
                                user.state.currentUser.id === user.state.user.id
                                    ?
                                    <>
                                        <label htmlFor="user-page__input">
                                        <ProfileIcon classType={"user-page"} src={imageURl ? imageURl : user.state.user.avatar}/>
                                        </label><label htmlFor="user-page__input" className="user-page__label-btn">
                                            Add avatar
                                        </label>
                                        <div className="user-page__input">
                                            <input id="user-page__input" type="file" onChange={onImageChange}/>
                                        </div>
                                    </>
                                    :
                                    <ProfileIcon classType={"user-page"} src={imageURl ? imageURl : user.state.user.avatar}/>
                            }
                            {
                                image &&
                                    <Button classType={"user-page__btn"} element={"Submit"} onClick={handleSubmit} />
                            }
                        </div>
                    </>
            }
        </div>
    )
})

export default withRouter(UserPage)