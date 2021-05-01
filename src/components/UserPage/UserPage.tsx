import { observer } from "mobx-react";
import React from "react"
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom"
import user from "src/store/user"
import Preloader from "src/components/common/Preloader"

type PathParamsType = {
    id: string
}

const UserPage: React.FC<RouteComponentProps<PathParamsType>> = observer(({match}): JSX.Element => {
    React.useEffect(()=> {
        user.getUser(match.params.id)
    },[location.pathname])

    if(user.state.isFetching || !user.state.user) return <Preloader style={"user-page__preloader"} />
    console.log(user.state.user)
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
                    </>
            }
        </div>
    )
})

export default withRouter(UserPage)