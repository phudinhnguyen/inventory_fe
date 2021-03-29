import React from "react"
import { Redirect, Route, Switch } from "react-router"
import { Login } from "../component/Account"

const Account: React.FC = React.memo(() => {
    return <Switch>
        <Route exact={true} path="/" component={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/pharmacy-login/:pharmacyToken" component={Login} />
    </Switch>
})

export default Account