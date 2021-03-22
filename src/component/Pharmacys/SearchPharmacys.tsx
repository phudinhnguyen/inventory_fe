import React, { useRef, useState } from "react"
import { Header } from "../shared"
import { getListPharmacy } from '../../api'
import { PharmacyModel } from "../../models/pharmacy"
import Loading from "../shared/Loading"
import { useHistory } from "react-router"
import { useRecoilValue } from "recoil"
import { accountDataState } from "../../recoil/account"
import { debounce, useAsync } from "../../utils"
import useClickOutside from "../../utils/hooks/useClickOutSide"

const SearchPharmacys = React.memo(() => {
    const history = useHistory()
    const searchRef: any = useRef()
    const inputSearch: any = useRef()

    const getListPharmacyAsync = useAsync<Array<PharmacyModel>>(getListPharmacy)

    const accountInfo = useRecoilValue(accountDataState)
    const [ state, setState ] = useState<{
        offset: number,
        limit: number,
        listPharmacy: Array<PharmacyModel>,
        show: boolean,
    }>({
        offset: 0,
        limit: 10,
        listPharmacy: [],
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
            listPharmacy: [],
            show: false,
        })
    }

    const handleSeach = debounce((value: string) => {
        if (value === '') {
            resetState()
            return
        }

        const params = {
            offset: state.offset,
            limit: state.limit,
            mName: value,
            adminId: accountInfo.doctor.mId
        }

        getListPharmacyAsync.execute(params).then(res => {
            setState(prev => ({
                ...prev,
                offset: 0,
                listPharmacy: res,
                show: true,
            }))
        })
    }, 500)

    const handleScroll = (e: any) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        const params = {
            offset: state.offset,
            limit: state.limit,
            mName: inputSearch.current.value,
            adminId: accountInfo.doctor.mId
        }

        if (bottom) {
            getListPharmacyAsync.execute(params).then(res => {
                setState(prev => ({
                    ...prev,
                    offset: prev.offset + 10,
                    listPharmacy: [ ...prev.listPharmacy, ...res ]
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
                            placeholder="Tìm kiếm theo tên nhà thuốc"
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
                    state.show && state.listPharmacy.length !== 0 &&
                    <div className="search-results">
                        <ul onScroll={handleScroll} style={{ maxHeight: "400px", overflowY: "auto" }}>
                            {
                                state.listPharmacy.map((pharmacy: PharmacyModel) => {
                                    return <li onClick={() => history.push(`/inventory-of-pharmacy?mPharCode=${ pharmacy.mPharCode }&mId=${ pharmacy.mId }`)}>
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
                {
                    getListPharmacyAsync.status === 'loading' &&
                    <div className='p-3 d-flex justify-content-center'>
                        <Loading />
                    </div>
                }
            </div>
        </div>
    </div>
})

export default SearchPharmacys