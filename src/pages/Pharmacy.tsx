import React from "react"
import { Redirect, Route, Switch } from "react-router"
import { SearchPharmacys } from "../component/Pharmacys"
import InventoryOfPharmacy from "../component/Pharmacys/InventoryOfPharmacy"

const Pharmacys: React.FC = React.memo(() => {
    return <Switch>
        <Route exact={true} path="/" component={() => <Redirect to="/search-pharmacys" />} />
        <Route path="/search-pharmacys" component={SearchPharmacys} />
        <Route path="/inventory-og-pharmacy" component={InventoryOfPharmacy} />
    </Switch>
})

export default Pharmacys