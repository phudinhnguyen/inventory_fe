import React, { useEffect, useRef, useState } from "react"
import { Header } from "../shared"
import { searchProduct } from '../../api'
import { PharmacyModel } from "../../models/pharmacy"
import Loading from "../shared/Loading"
import { useHistory } from "react-router"
import { useRecoilValue } from "recoil"
import { accountDataState } from "../../recoil/account"
import { debounce, useAsync } from "../../utils"
import useClickOutside from "../../utils/hooks/useClickOutSide"

const SearchProduct = React.memo(() => {
    const history = useHistory()
    const searchRef: any = useRef()
    const inputSearch: any = useRef()

    const searchProductAsync = useAsync(searchProduct)

    const accountInfo = useRecoilValue(accountDataState)
    const [ state, setState ] = useState<{
        offset: number,
        limit: number,
        listProduct: any,
        show: boolean,
    }>({
        offset: 0,
        limit: 10,
        listProduct: [],
        show: false,
    })

    useClickOutside(() => {
        setState(prev => ({ ...prev, show: false }))
    }, [ searchRef ])

    const resetState = () => {
        inputSearch.current.value = ''
        setState({
            offset: 0,
            limit: 10,
            listProduct: [],
            show: false,
        })
    }

    const handleSeach = debounce((value: string) => {
        if (value == '') {
            resetState()
            return
        }

        const params = {
            offset: state.offset,
            limit: state.limit,
            search: value,
        }

        searchProductAsync.execute(params).then(res => {
            setState(prev => ({
                ...prev,
                offset: 0,
                listProduct: res,
                show: true,
            }))
        })
    }, 500)

    const handleScroll = (e: any) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        const params = {
            offset: state.offset,
            limit: state.limit,
            search: inputSearch.current.value,
        }

        if (bottom) {
            searchProductAsync.execute(params).then(res => {
                setState(prev => ({
                    ...prev,
                    offset: prev.offset + 10,
                    // listProduct: [ ...prev.listProduct, ...res ]
                }))
            })
        }
    };

    return <div className='w-100'>
        <Header
            title="Nhập danh sách nhà thuốc"
            subTitle={`Admin ${ accountInfo.doctor.mDisplayName }`}
            backTo="/"
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
                            placeholder="Tên theo tên thuốc"
                            className="input-search"
                            onChange={(e => {
                                e.preventDefault()
                                const { value } = e?.target
                                handleSeach(value)
                            })}
                        />
                        <span id="btn-search-clear" onClick={resetState}>
                            <img src="./images/cancel.svg" title="Xóa" className="img-fluid" width={24} />
                        </span>
                        <button type="button" className="btn-search">
                            <img src="./images/search.svg" title="Tìm kiếm" className="img-fluid" width={24} />
                        </button>
                    </form>
                </div>
                {
                    searchProductAsync.status == 'loading' &&
                    <div className='p-3 d-flex justify-content-center'>
                        <Loading />
                    </div>
                }
                {
                    state.show && state.listProduct.length != 0 &&
                    <div className="search-results">
                        <ul onScroll={handleScroll} style={{ maxHeight: "400px", overflowY: "auto" }}>
                            {
                                state.listProduct.map((product: any) => {
                                    return <li onClick={() => history.push(`/inventory-of-pharmacy?mPharCode=&mId=$`)}>
                                        <a>
                                            <strong></strong><br />
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