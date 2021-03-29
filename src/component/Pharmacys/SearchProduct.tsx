import React, { useEffect, useRef, useState } from "react"
import { Header } from "../shared"
import { ISearchProduct, searchProduct } from '../../api'
import Loading from "../shared/Loading"
import { useHistory } from "react-router"
import { debounce, useAsync } from "../../utils"
import useClickOutside from "../../utils/hooks/useClickOutSide"
import { PharmacyDetailModel, ProductModel } from "../../models"
import usePharmacy from "../../hooks/pharmacy"

const SearchProduct = React.memo(() => {
    const history = useHistory()
    const searchRef: any = useRef()
    const inputSearch: any = useRef()

    const { getCurrentDetailPharmacy } = usePharmacy()
    const getCurrentDetailPharmacyAsync = useAsync<PharmacyDetailModel>(getCurrentDetailPharmacy)
    const searchProductAsync = useAsync(searchProduct)

    const [state, setState] = useState<{
        from: number,
        size: number,
        listProduct: Array<ProductModel>,
        show: boolean,
        outOfData: boolean,
        total?: number,
    }>({
        from: 0,
        size: 10,
        listProduct: [],
        show: false,
        outOfData: false,
        total: 0,
    })

    useEffect(() => {
        getCurrentDetailPharmacyAsync.execute()
    }, [])

    useClickOutside(() => {
        setState(prev => ({ ...prev, show: false }))
    }, [searchRef])

    const getQuery = ({ search, from, size }: ISearchProduct) => {
        return {
            from,
            size,
            query: {
                match: {
                    name: search
                },
            }
        }
    }

    const resetState = () => {
        inputSearch.current.value = ''
        setState({
            from: 0,
            size: 10,
            listProduct: [],
            outOfData: false,
            show: false,
            total: 0
        })
    }

    const handleSeach = debounce((value: string) => {
        if (value == '') {
            resetState()
            return
        }

        const params = {
            from: state.from,
            size: state.size,
            search: value,
        }

        searchProductAsync.execute(getQuery(params)).then(res => {
            setState(prev => ({
                ...prev,
                from: 0,
                listProduct: res.data,
                show: true,
                total: res.total,
                outOfData: res.data.length === 0
            }))
        })
    }, 500)

    const handleScroll = (e: any) => {
        if (state.outOfData) return
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
        const params = {
            from: state.from + 10,
            size: state.size,
            search: inputSearch.current.value,
        }

        if (bottom) {
            searchProductAsync.execute(getQuery(params)).then(res => {
                setState(prev => ({
                    ...prev,
                    from: prev.from + 10,
                    listProduct: [...prev.listProduct, ...res.data],
                    total: res.total,
                    outOfData: res.data.length < 10
                }))
            })
        }
    }

    return <div className='w-100'>
        <Header
            title="Tìm kiếm sản phẩm"
            subTitle={getCurrentDetailPharmacyAsync.value?.pharmacy?.mName}
            backTo="/inventory-of-pharmacy"
        />
        <div id="main">
            <div className="container" ref={searchRef}>
                <div className="form-search">
                    <form id="search">
                        <input
                            ref={inputSearch}
                            onClick={() => setState(prev => ({ ...prev, show: true }))}
                            type="text"
                            name="search"
                            placeholder="Tìm kiếm theo tên thuốc"
                            className="input-search"
                            onChange={(e => {
                                e.preventDefault()
                                const { value } = e?.target
                                handleSeach(value)
                            })}
                        />
                        <span id="btn-search-clear" onClick={resetState}>
                            {
                                searchProductAsync.status == 'loading' ?
                                    <Loading /> :
                                    <img src="./images/cancel.svg" title="Xóa" className="img-fluid" width={24} />
                            }
                        </span>

                        <button type="button" className="btn-search">
                            <img src="./images/search.svg" title="Tìm kiếm" className="img-fluid" width={24} />
                        </button>
                    </form>
                </div>
                {
                    state.show && state.listProduct.length != 0 &&
                    <div className="search-results">
                        <ul onScroll={handleScroll} style={{ maxHeight: "400px", overflowY: "auto" }}>
                            {
                                state.listProduct.map((product: ProductModel, index) => {
                                    return <li onClick={() => history.push(`/update-product?productId=${product._id}`)}>
                                        <a>
                                            <strong>{product.name}</strong><br />
                                            <small className="txt-gray"></small>
                                        </a>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    </div>
})

export default SearchProduct