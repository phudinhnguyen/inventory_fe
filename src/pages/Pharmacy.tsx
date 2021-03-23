import React, { useEffect } from "react"
import { Redirect, Route, Switch, useHistory } from "react-router"
import { getAccountInfo } from "../api"
import { FormProduct, InventoryOfPharmacy, SearchPharmacys, SearchProduct } from "../component/Pharmacys"

const Pharmacys: React.FC = React.memo(() => {
    const history = useHistory()

    useEffect(() => {
        const accountInfo = getAccountInfo()
        if (!accountInfo.loginSession.mToken) {
            history.push('/login')
        }
    })

    return <Switch>
        <Route exact={true} path="/" component={() => <Redirect to="/search-pharmacys" />} />
        <Route path="/search-pharmacys" component={SearchPharmacys} />
        <Route path="/inventory-of-pharmacy" component={InventoryOfPharmacy} />
        <Route path="/search-product" component={SearchProduct} />
        <Route path="/update-product" component={FormProduct} />
    </Switch>
})

export default Pharmacys