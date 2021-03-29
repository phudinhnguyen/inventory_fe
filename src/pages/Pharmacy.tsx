/* eslint-disable array-callback-return */
import React, { FC, useCallback } from "react"
import { Redirect, Route, Switch } from "react-router"
import { useRecoilValue } from "recoil"
import { FormProduct, InventoryOfPharmacy, SearchPharmacys, SearchProduct } from "../component/Pharmacys"
import { accountDataState } from "../recoil/account"

interface IRouter {
    path: string,
    exact: boolean,
    component: FC
}

const routers: Array<IRouter> = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/search-pharmacys" />
    },
    {
        path: '/search-pharmacys',
        exact: false,
        component: SearchPharmacys
    },
    {
        path: '/inventory-of-pharmacy',
        exact: false,
        component: InventoryOfPharmacy
    },
    {
        path: '/search-product',
        exact: false,
        component: SearchProduct
    },
    {
        path: '/update-product',
        exact: false,
        component: FormProduct
    },
]

const Pharmacys: React.FC = React.memo(() => {

    const account = useRecoilValue(accountDataState)

    const checkPermisstion = useCallback((path: string) => {
        let pathHasPermission: Array<string> = []

        if (account.doctor.mRole === 'ASSISTANT') {
            pathHasPermission = [
                "/search-pharmacys",
                "/inventory-of-pharmacy",
                "/search-product",
                "/update-product"
            ]
        }

        // if (account.doctor.mRole === '') {
        //     pathHasPermission = [
        //         "/search-product",
        //         "/update-product"
        //     ]
        // }


        if (pathHasPermission.includes(path)) return true
        return false
    }, [account])

    return <Switch>
        {
            routers.map((router: IRouter) => {
                const { path, exact, component } = router
                if (checkPermisstion(path)) {
                    return <Route exact={exact} path={path} component={component} />
                }
            })
        }
    </Switch>
})

export default Pharmacys