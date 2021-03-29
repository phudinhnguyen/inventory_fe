/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { useAccount } from "../../hooks"
import { accountDataState } from "../../recoil/account"

interface IProps {
    title: string
    subTitle: string
    backTo: string
}

const Header = React.memo((props: IProps) => {
    const { title, subTitle, backTo = '/' } = props
    const history = useHistory()

    const account = useRecoilValue(accountDataState)
    const { logout } = useAccount()

    const [state, setState] = useState({
        visible: false
    })

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
                <img src="./images/back.svg" width="{9}" alt="back" />
            </Link>
            <span className="navbar-toggler-icon" onClick={() => setState(prev => ({ ...prev, visible: true }))} />
        </nav>

        <div className={`collapse navbar-collapse ${state.visible && 'show'}`} id="navbarPrescription">
            <a onClick={() => setState(prev => ({ ...prev, visible: false }))} className="menu-overlay"></a>
            <div className="bg-blue">
                <div className="d-flex align-items-center">
                    <img src="./images/logo.png" title="Medigo" className="img-fluid" width={65} alt='logo' />
                    <span>{account.doctor.mDisplayName}</span>
                </div>
            </div>
            <ul className="navbar-nav ml-auto menu-style">
                <li className="nav-item med-text-center">
                    <a className="nav-link nav-logout" onClick={() => {
                        logout()
                        history.push('/login')
                    }}>Đăng xuất</a>
                </li>
            </ul>
        </div>

    </header>
})

export default Header