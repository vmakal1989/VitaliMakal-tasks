import React from "react"
import spinner from "src/assets/images/svg/spinner.svg"

type Props = {
    style: string
}

const Preloader: React.FC<Props> = ({style}): JSX.Element => {
    return (
        <div className={style}>
            <img src={spinner} alt={spinner}/>
        </div>
    )
}

export default Preloader