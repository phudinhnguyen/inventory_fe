import React, { useEffect } from "react"
import { Redirect, Route, Switch, useHistory } from "react-router"
import { getAccountInfo } from "../api"
import { Login } from "../component/Account"

const Account: React.FC = React.memo(() => {
    const history = useHistory()

    useEffect(() => {
        const accountInfo = getAccountInfo()
        if (accountInfo.loginSession.mToken) {
            history.push('/search-pharmacys')
        }
    })

    return <Switch>
        <Route exact={true} path="/" component={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
    </Switch>
})

export default Account