import React, { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { getDetailPharmacy, getInventoryInPharmacy } from "../../api"
import { PharmacyDetailModel } from "../../models/pharmacy"
import { accountDataState } from "../../recoil/account"
import { useAsync, useQuery } from "../../utils/hooks"
import { Header } from "../shared"

const InventoryOfPharmacy = React.memo(() => {
    const query = useQuery()
    const getDetailPharmacyAsync = useAsync<PharmacyDetailModel>(getDetailPharmacy)
    const getInventoryInPharmacyAsync = useAsync(getInventoryInPharmacy)

    const accountInfo = useRecoilValue(accountDataState)

    useEffect(() => {
        getDetailPharmacyAsync.execute({ pharmacyCode: query.get('mPharCode') })
    }, [])

    useEffect(() => {
        getInventoryInPharmacyAsync.execute({
            pharmacyId: query.get('mId'),
            adminId: accountInfo.doctor.mId,
            filter: {
                offset: 0,
                limit: 10,
                skip: 0,
            }
        })
    }, [accountInfo.doctor.mId])

    return <>
        <Header
            title={getDetailPharmacyAsync.value?.pharmacy.mName}
            subTitle={getDetailPharmacyAsync.value?.pharmacyAddress.mAddress}
            backTo="/search-pharmacys"
        />
        <div id="main">
            <div className="container">
                <div className="form-search">
                    <p className="mb-2">Nhập liệu</p>
                    <form id="search">
                        <input type="text" name="search" placeholder="Tên theo tên thuốc" className="input-search" />
                        <a href="javascript:void(0);" id="btn-search-clear">
                            <img src="./images/cancel.svg" title="Xóa" className="img-fluid" width={24} />
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
                    <p className="text-center">NT đang có 4300 sản phẩm</p>
                    <div className="d-flex justify-content-between mb-3">
                        <label className="mt-2">Sắp xếp theo</label>
                        <select className="sort-by">
                            <option>Ngày cập nhật</option>
                            <option>Bán chạy</option>
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
                                        <th scope="col">Tên</th>
                                        <th scope="col" style={{ width: 70 }}>Đơn vị</th>
                                        <th scope="col" style={{ width: 90 }}>Số lượng</th>
                                        <th scope="col" style={{ width: 80 }}>ĐƠN GIÁ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Panadol Extra 180 viên</td>
                                        <td>Viên</td>
                                        <td>240</td>
                                        <td className="price">12.000</td>
                                    </tr>
                                    <tr>
                                        <td>Panadol Extra 180 viên</td>
                                        <td>Miếng</td>
                                        <td>240</td>
                                        <td className="price">12.000</td>
                                    </tr>
                                    <tr>
                                        <td>Panadol Extra 180 viên</td>
                                        <td>Ống</td>
                                        <td>240</td>
                                        <td className="price">12.000</td>
                                    </tr>
                                    <tr>
                                        <td>Panadol Extra 180 viên</td>
                                        <td>Lọ</td>
                                        <td>240</td>
                                        <td className="price">120.000</td>
                                    </tr>
                                    <tr>
                                        <td>Panadol Extra 180 viên</td>
                                        <td>Lọ</td>
                                        <td>240</td>
                                        <td className="price">120.000</td>
                                    </tr>
                                    <tr>
                                        <td>Panadol Extra 180 viên</td>
                                        <td>Lọ</td>
                                        <td>240</td>
                                        <td className="price">120.000</td>
                                    </tr>
                                    <tr>
                                        <td>Panadol Extra 180 viên</td>
                                        <td>Lọ</td>
                                        <td>240</td>
                                        <td className="price">120.000</td>
                                    </tr>
                                    <tr>
                                        <td>Panadol Extra 180 viên</td>
                                        <td>Lọ</td>
                                        <td>240</td>
                                        <td className="price">120.000</td>
                                    </tr>
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