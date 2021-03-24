/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useHistory } from "react-router"
import { useRecoilValue } from "recoil"
import { getInventoryInPharmacy } from "../../api"
import usePharmacy from "../../hooks/pharmacy"
import { ProductModel } from "../../models"
import { PharmacyDetailModel } from "../../models/pharmacy"
import { accountDataState } from "../../recoil/account"
import { debounce } from "../../utils"
import { useAsync } from "../../utils/hooks"
import { Header } from "../shared"

interface IState {
    skip: number,
    limit: number,
    listProduct: Array<ProductModel>,
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
        getCurrentDetailPharmacyAsync.execute()
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
                <div className="form-search">
                    {/* <p className="mb-2">Nhập liệu</p> */}
                    <form id="search">
                        <input
                            ref={inputSearch}
                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            onChange={(e) => {
                                const { value } = e.target
                                handleChange(value)
                                inputSearch.current.value = value
                            }} type="text" name="search" placeholder="Tìm kiếm theo tên thuốc" className="input-search" />
                        <a
                            id="btn-search-clear"
                            onClick={() => {
                                inputSearch.current.value = ''
                                setState(initState)
                                getInitData()
                            }}
                        >
                            <img src="./images/cancel.svg" title="Xóa" className="img-fluid" width={24} alt='' />
                        </a>
                        <button type="button" className="btn-search">
                            <img src="./images/search.svg" title="Tìm kiếm" className="img-fluid" width={24} />
                        </button>
                    </form>
                </div>
                <div className="row">
                    <div className="spacing" />
                </div>
                <div className="mt-3">
                    <div className="d-flex py-3 justify-content-between align-items-center">
                        <p className="m-0">NT đang có {getInventoryInPharmacyAsync.value?.length} sản phẩm</p>
                        <button onClick={() => history.push('search-product')} type="button" className="btn py-1 px-3" data-dismiss="modal">Thêm</button>
                    </div>
                    <div className="row">
                        <div className="table-products">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Tên</th>
                                        <th scope="col" style={{ width: 70 }}>Đơn vị</th>
                                        <th scope="col" style={{ width: 90 }}>Số lượng</th>
                                        <th scope="col" style={{ width: 80 }}>ĐƠN GIÁ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        state.listProduct?.map((product: ProductModel) => {
                                            return <tr>
                                                <td>{product.name}</td>
                                                <td>{product.mPrice}</td>
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
            </div>
        </div>
    </>
})

export default InventoryOfPharmacy