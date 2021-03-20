import React from "react"
import { Link } from "react-router-dom"

interface IProps {
    title: string
    subTitle: string
    backTo: string
}

const Header = React.memo((props: IProps) => {
    const { title, subTitle, backTo = '/' } = props

    return <header>
        <nav className="navbar navbar-expand-xl">
            <span className="navbar-brand page-title">
                {title}<br />
                <small>{subTitle}</small>
            </span>
            <Link
                className="btn-back"
                to={backTo}
            >
                <img src="./images/back.svg" width="{9}" />
            </Link>
        </nav>
    </header>
})

export default Header