import React from "react"

const Header = React.memo(() => {
    return <header>
        <nav className="navbar navbar-expand-xl">
            <span className="navbar-brand page-title">
                NT Bình An<br />
                <small>2 Lê Duẫn, P.1, Q.1, Đà Nẵng</small>
            </span>
            <a href="homepage.html" className="btn-back">
                <img src="./images/back.svg" width="{9}" />
            </a>
        </nav>
    </header>
})

export default Header