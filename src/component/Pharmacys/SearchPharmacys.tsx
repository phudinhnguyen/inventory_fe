import React from "react"
import { Header } from "../shared"

const SearchPharmacys = React.memo(() => {
    return <div>
        <Header />
        <div id="main">
            <div className="container">
                <div className="form-search">
                    <form id="search">
                        <input type="text" name="search" placeholder="Tên theo tên thuốc" className="input-search" defaultValue="Panadol" />
                        <a href="javascript:void(0);" id="btn-search-clear">
                            <img src="./images/cancel.svg" title="Xóa" className="img-fluid" width={24} />
                        </a>
                        <button type="button" className="btn-search">
                            <img src="./images/search.svg" title="Tìm kiếm" className="img-fluid" width={24} />
                        </button>
                    </form>
                </div>
                <div className="search-results">
                    <ul>
                        <li>
                            <a href="product.html">
                                <strong>Panadol Extra vỉ 10 viên</strong><br />
                            </a>
                        </li>
                        <li>
                            <a href="product.html">
                                <strong>Panadol Extra hộp 60 viên</strong><br />
                            </a>
                        </li>
                        <li>
                            <a href="product.html">
                                <strong>Panadol Extra hộp 120 viên</strong><br />
                            </a>
                        </li>
                        <li>
                            <a href="product.html">
                                <strong>Panadol Extra hộp 180 viên</strong><br />
                            </a>
                        </li>
                        <li>
                            <a href="product.html">
                                <strong>Panadol Extra hộp 240 viên</strong><br />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

})

export default SearchPharmacys