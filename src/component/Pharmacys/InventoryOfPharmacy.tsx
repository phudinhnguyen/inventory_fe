/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useHistory } from "react-router"
import { useRecoilValue } from "recoil"
import { getInventoryInPharmacy, getPharmacyInfoLocal } from "../../api"
import usePharmacy from "../../hooks/pharmacy"
import { InventoryModel } from "../../models"
import { PharmacyDetailModel } from "../../models/pharmacy"
import { accountDataState } from "../../recoil/account"
import { debounce } from "../../utils"
import { useAsync } from "../../utils/hooks"
import { Header } from "../shared"

interface IState {
    skip: number,
    limit: number,
    listProduct: Array<InventoryModel>,
    total?: number,
}

const initState = {
    skip: 0,
    limit: 10,
    listProduct: [],
    total: 0,
}

const InventoryOfPharmacy = React.memo(() => {
    const history = useHistory()

    const { getCurrentDetailPharmacy } = usePharmacy()
    const getCurrentDetailPharmacyAsync = useAsync<PharmacyDetailModel>(getCurrentDetailPharmacy)
    const getInventoryInPharmacyAsync = useAsync(getInventoryInPharmacy)

    const accountInfo = useRecoilValue(accountDataState)

    const pharmacyId = useMemo(() => {
        return getCurrentDetailPharmacyAsync.value?.pharmacy.mId
    }, [getCurrentDetailPharmacyAsync.value])

    const [state, setState] = useState<IState>(initState)
    const inputSearch: any = useRef()

    useEffect(() => {
        const pharmacyInfo = getPharmacyInfoLocal()
        if (pharmacyInfo) {
            getCurrentDetailPharmacyAsync.execute()
        } else {
            history.push('/search-pharmacys')
        }
    }, [])

    useEffect(() => {
        getInitData()
    }, [accountInfo.doctor.mId, pharmacyId])

    const getInitData = () => {
        if (!pharmacyId) return
        getInventoryInPharmacyAsync.execute({
            pharmacyId,
            adminId: accountInfo.doctor.mId,
            filter: {
                skip: initState.skip,
                limit: initState.limit,
            }
        }).then(res => {
            setState(prev => ({ ...prev, listProduct: res }))
        })
    }

    const handleChange = debounce((value: string) => {
        if (value === '') {
            getInitData()
            return
        }

        getInventoryInPharmacyAsync.execute({
            pharmacyId,
            adminId: accountInfo.doctor.mId,
            filter: {
                skip: initState.skip,
                limit: initState.limit,
                where: {
                    mProductName: {
                        regexp: `/${value}/`
                    },
                }
            }
        }).then(res => {
            setState(prev => ({ ...prev, listProduct: res }))
        })
    }, 500)

    return <>
        <Header
            title={getCurrentDetailPharmacyAsync.value?.pharmacy.mName}
            subTitle={getCurrentDetailPharmacyAsync.value?.pharmacyAddress.mAddress}
            backTo="/search-pharmacys"
        />
        <div id="main" style={{ width: "100%" }}>

            <div className="container">
                <p className="mt-3 mb-3">
                    <a onClick={() => history.push('search-product')} className="btn btn-block btn-border" title="TH??M S???N PH???M M???I">
                        <img src="./images/add_circle.svg" title="Add" className="img-fluid" width={24} />
                            TH??M S???N PH???M M???I
                    </a>
                </p>

                <div className="row">
                    <div className="spacing" />
                </div>

                {
                    state.listProduct.length === 0 &&
                    <div className="d-flex py-3 justify-content-center align-items-center">
                        <p className="m-0">Nh?? thu???c ch??a c?? s???n ph???m n??o</p>
                    </div>
                }


                {
                    state.listProduct.length !== 0 &&

                    <div className="mt-3">
                        <div className="d-flex py-1 justify-content-center align-items-center">
                            <p className="m-0">NT ??ang c?? {getInventoryInPharmacyAsync.value?.length} s???n ph???m</p>
                        </div>
                        <div className="form-search">
                            <form id="search">
                                <input
                                    ref={inputSearch}
                                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                    onChange={(e) => {
                                        const { value } = e.target
                                        handleChange(value)
                                        inputSearch.current.value = value
                                    }} type="text" name="search" placeholder="T??m ki???m theo t??n thu???c" className="input-search" />
                                <a
                                    id="btn-search-clear"
                                    onClick={() => {
                                        inputSearch.current.value = ''
                                        setState(initState)
                                        getInitData()
                                    }}
                                >
                                    <img src="./images/cancel.svg" title="X??a" className="img-fluid" width={24} alt='' />
                                </a>
                                <button type="button" className="btn-search">
                                    <img src="./images/search.svg" title="T??m ki???m" className="img-fluid" width={24} />
                                </button>
                            </form>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <label className="mt-2">S???p x???p theo</label>
                            <select className="sort-by">
                                <option>Ng??y c???p nh???t</option>
                                <option>B??n ch???y</option>
                                <option>Example</option>
                                <option>Example 2</option>
                                <option>Example 3</option>
                            </select>
                        </div>

                        <div className="row">
                            <div className="table-products">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">T??n</th>
                                            <th scope="col" style={{ width: 70 }}>????n v???</th>
                                            <th scope="col" style={{ width: 90 }}>S??? l?????ng</th>
                                            <th scope="col" style={{ width: 80 }}>????N GI??</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            state.listProduct?.map((product: InventoryModel) => {
                                                return <tr>
                                                    <td>{product.mProductName}</td>
                                                    <td>{product.mPkgName}</td>
                                                    <td>{product.mStockAmount}</td>
                                                    <td className="price">{product.mPrice}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </>
})

export default InventoryOfPharmacy