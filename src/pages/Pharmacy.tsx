import React from "react"
import { Redirect, Route, Switch } from "react-router"
import { FormProduct, InventoryOfPharmacy, SearchPharmacys, SearchProduct } from "../component/Pharmacys"

const Pharmacys: React.FC = React.memo(() => {
    return <Switch>
        <Route exact={true} path="/" component={() => <Redirect to="/search-pharmacys" />} />
        <Route path="/search-pharmacys" component={SearchPharmacys} />
        <Route path="/inventory-of-pharmacy" component={InventoryOfPharmacy} />
        <Route path="/search-product" component={SearchProduct} />
        <Route path="/update-product" component={FormProduct} />
    </Switch>
})

export default Pharmacys