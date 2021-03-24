import React, { useEffect, useMemo } from "react"
import { Header } from "../shared"
import usePharmacy from "../../hooks/pharmacy"
import { useAsync, useQuery } from "../../utils"
import { PharmacyDetailModel, ProductModel } from "../../models"
import { getInventoryInPharmacy, searchProduct } from "../../api"
import { useRecoilValue } from "recoil"
import { accountDataState } from "../../recoil/account"

const FormProduct = React.memo(() => {

    const query = useQuery()
    const productId: string = query.get('productId') || ''

    const { getCurrentDetailPharmacy } = usePharmacy()
    const getCurrentDetailPharmacyAsync = useAsync<PharmacyDetailModel>(getCurrentDetailPharmacy)
    const getInventoryInPharmacyAsync = useAsync(getInventoryInPharmacy)
    const searchProductAsync = useAsync(searchProduct)

    const accountInfo = useRecoilValue(accountDataState)

    useEffect(() => {
        getCurrentDetailPharmacyAsync.execute()
        searchProductAsync.execute(getQuery(productId))
    }, [])

    useEffect(() => {
        const pharmacyId = getCurrentDetailPharmacyAsync.value?.pharmacy?.mId
        const adminId = accountInfo?.loginSession?.mUserId

        if (!pharmacyId || !adminId) return
        getInventoryInPharmacyAsync.execute({
            adminId,
            pharmacyId,
        })
    }, [ accountInfo, getCurrentDetailPharmacyAsync.value ])

    const getQuery = (productId: string) => {
        return {
            query: {
                match: {
                    _id: productId
                },
            }
        }
    }

    const product: ProductModel = useMemo(() => {
        if (!searchProductAsync.value) return new ProductModel({})
        return searchProductAsync.value.data[ 0 ]
    }, [ searchProductAsync.value ])

    return <div className='w-100'>
        <Header
            title="Cập nhật sản phẩm"
            subTitle={getCurrentDetailPharmacyAsync.value?.pharmacy?.mName}
            backTo="/search-product"
        />

        <div id="main">
            <div className="container">
                <div className="d-flex align-items-center product-summary">
                    <div className="product-thumb">
                        <img src={product.imageUrls[ 0 ]} className="img-fluid" />
                    </div>
                    <strong>{product.name}</strong>
                </div>
                <div className="row">
                    <div className="spacing" />
                </div>
                <div className="product-info">
                    <form>
                        <div className="form-group row">
                            <label className="col-7 col-sm-7 col-form-label">Đơn vị</label>
                            <div className="col-5 col-sm-5">
                                <select className="form-control">
                                    <option selected>Viên</option>
                                    <option>Vỉ</option>
                                    <option>Miếng</option>
                                    <option>Hộp</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-7 col-sm-7 col-form-label">Số lượng</label>
                            <div className="col-5 col-sm-5">
                                <input type="number" className="form-control" min={0} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-7 col-sm-7 col-form-label">Đơn giá (VND)</label>
                            <div className="col-5 col-sm-5">
                                <input type="number" className="form-control" min={0} />
                            </div>
                        </div>
                        <p><strong>Bán theo đơn vị khác</strong></p>
                        <div className="form-group row">
                            <label className="col-7 col-sm-7 col-form-label">Đơn vị</label>
                            <div className="col-5 col-sm-5">
                                <select className="form-control">
                                    <option selected>Viên</option>
                                    <option>Vỉ</option>
                                    <option>Miếng</option>
                                    <option>Hộp</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-7 col-sm-7 col-form-label">Đơn giá (VND)</label>
                            <div className="col-5 col-sm-5">
                                <input type="number" className="form-control" min={0} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-7 col-sm-7 col-form-label">Đơn vị</label>
                            <div className="col-5 col-sm-5">
                                <select className="form-control">
                                    <option selected>Viên</option>
                                    <option>Vỉ</option>
                                    <option>Miếng</option>
                                    <option>Hộp</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-7 col-sm-7 col-form-label">Đơn giá (VND)</label>
                            <div className="col-5 col-sm-5">
                                <input type="number" className="form-control" min={0} />
                            </div>
                        </div>
                        <div className="fixed-button d-flex justify-content-between">
                            <button type="button" className="btn btn-white" data-dismiss="modal">Hủy</button>
                            <a type="submit" className="btn" data-toggle="modal" data-target="#confirmModal">HOÀN THÀNH</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

})

export default FormProduct