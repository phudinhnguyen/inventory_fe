import React, { useRef, useState } from "react"
import { useAsync } from "../../hooks"
import { debounce } from "../../utils"
import { Header } from "../shared"
import { getListPharmacy } from '../../api'
import { PharmacyModel } from "../../models/pharmacy"
import Loading from "../shared/Loading"
import useClickOutside from "../../hooks/useClickOutSide"
import { useHistory } from "react-router"

const SearchPharmacys = React.memo(() => {

    const history = useHistory()
    const searchRef: any = useRef()

    const [state, setState] = useState<{
        offset: number,
        limit: number,
        searchValue: string,
        listPharmacy: Array<PharmacyModel>,
        show: boolean,
    }>({
        offset: 0,
        limit: 10,
        searchValue: '',
        listPharmacy: [],
        show: false,
    })
    const getListPharmacyAsync = useAsync<Array<PharmacyModel>>(getListPharmacy)

    const resetState = () => {
        setState({
            offset: 0,
            limit: 10,
            searchValue: '',
            listPharmacy: [],
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
            mName: value,
        }

        getListPharmacyAsync.execute(params).then(res => {
            setState(prev => ({
                ...prev,
                offset: 0,
                listPharmacy: res,
                show: true,
            }))
        })
    }, 1000)

    const handleScroll = (e: any) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        const params = {
            offset: state.offset,
            limit: state.limit,
            mName: state.searchValue,
        }

        if (bottom) {
            getListPharmacyAsync.execute(params).then(res => {
                setState(prev => ({
                    ...prev,
                    offset: prev.offset + 10,
                    listPharmacy: [...prev.listPharmacy, ...res]
                }))
            })
        }
    };

    useClickOutside([searchRef], () => {
        setState(prev => ({ ...prev, show: false }))
    })

    return <div className='w-100'>
        <Header
            title="Nhập danh sách nhà thuốc"
            subTitle={`Admin Nguyễn Đình Phúc`}
            backTo="/"
        />
        <div id="main">
            <div className="container" ref={searchRef}>
                <div className="form-search">
                    <form id="search">
                        <input
                            onClick={() => setState(prev => ({ ...prev, show: true }))}
                            type="text"
                            name="search"
                            placeholder="Tên theo tên thuốc"
                            className="input-search"
                            onChange={(e => {
                                const { value } = e?.target
                                setState(prev => ({ ...prev, searchValue: value }))
                                handleSeach(value)
                            })}
                            value={state.searchValue}
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
                    getListPharmacyAsync.status == 'loading' &&
                    <div className='p-3 d-flex justify-content-center'>
                        <Loading />
                    </div>
                }
                {
                    state.show && state.listPharmacy.length != 0 &&
                    <div className="search-results">
                        <ul onScroll={handleScroll} style={{ maxHeight: "400px", overflowY: "auto" }}>
                            {
                                state.listPharmacy.map((pharmacy: PharmacyModel) => {
                                    return <li onClick={() => history.push(`/inventory-og-pharmacy?pharmacyId=${pharmacy.mId}`)}>
                                        <a>
                                            <strong>{pharmacy.mName}</strong><br />
                                            <small className="txt-gray">{pharmacy.mPharCode}</small>
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

export default SearchPharmacys