import React from "react"
import { Header } from "../shared"
import Loading from "../shared/Loading"
import { useHistory } from "react-router"

const FormProduct = React.memo(() => {
    const history = useHistory()

    return <div className='w-100'>
        <Header
            title="NT Bình An"
            subTitle={`2 Lê Duẫn, P.1, Q.1, Đà Nẵng`}
            backTo="/"
        />

        <div id="main">
            <div className="container">
                <div className="d-flex align-items-center product-summary">
                    <div className="product-thumb">
                        <img src="./images/demo.png" className="img-fluid" />
                    </div>
                    <strong>Panadol Extra hôp 100 viên</strong>
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