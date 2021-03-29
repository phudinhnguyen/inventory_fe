/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Header } from "../shared"
import usePharmacy from "../../hooks/pharmacy"
import { useAsync, useQuery } from "../../utils"
import { PharmacyDetailModel, ProductModel, IDongGoi, InventoryModel } from "../../models"
import { getInventoryInPharmacy, getPharmacyInfoLocal, searchProduct, updatePharmacyInventory } from "../../api"
import { useRecoilValue } from "recoil"
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { accountDataState } from "../../recoil/account"
import Loading from "../shared/Loading"
import { useHistory } from "react-router"

const validationSchema = yup
    .object()
    .shape({
        mStockAmount: yup
            .number(),
        // .required('Vui lòng không được bỏ trống'),
        mPrice: yup
            .number(),
        // .required('Vui lòng không được bỏ trống'),
    });

interface IFormValue {
    dong_goi: IDongGoi,
    errors: any,
    values: {
        mPrice?: number;
        mStockAmount?: number;
    },
    handleSubmit: Function,
    isSubmitting: boolean,
}

const FormProduct = React.memo(() => {
    const query = useQuery()
    const productId: string = query.get('productId') || ''
    const history = useHistory()

    const { getCurrentDetailPharmacy } = usePharmacy()

    const getCurrentDetailPharmacyAsync = useAsync<PharmacyDetailModel>(getCurrentDetailPharmacy)
    const { mId: pharmacyId } = getCurrentDetailPharmacyAsync.value?.pharmacy || new PharmacyDetailModel({})
    const getInventoryInPharmacyAsync = useAsync(getInventoryInPharmacy)
    const searchProductAsync = useAsync(searchProduct)
    const updatePharmacyInventoryAsync = useAsync(updatePharmacyInventory)

    const accountInfo = useRecoilValue(accountDataState)
    const [state, setState] = useState({
        visible: false
    })
    let formValuesRef: any = useRef({
        formValues: []
    } as { formValues: Array<IFormValue> })

    useEffect(() => {
        const pharmacyInfo = getPharmacyInfoLocal()
        if (pharmacyInfo) {
            getCurrentDetailPharmacyAsync.execute()
        } else {
            history.push('/search-pharmacys')
        }
    }, [])

    useEffect(() => {
        searchProductAsync.execute(getQuery(productId))
    }, [productId])

    useEffect(() => {
        const pharmacyId = getCurrentDetailPharmacyAsync.value?.pharmacy?.mId
        const adminId = accountInfo?.loginSession?.mUserId

        if (!pharmacyId || !adminId) return
        getInventoryInPharmacyAsync.execute({
            adminId,
            pharmacyId,
            filter: {
                where: {
                    mProductId: productId,
                }
            }
        })
    }, [accountInfo, getCurrentDetailPharmacyAsync.value])

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
        const listInventory = getInventoryInPharmacyAsync.value
        const _product: ProductModel = searchProductAsync.value?.data[0]

        if (!_product || !listInventory) return new ProductModel({})

        const getInventoryById = (id: string) => {
            return listInventory.filter((inventory: InventoryModel) => inventory.mPackageId === id)[0]
        }

        return {
            ..._product,
            dong_goi: _product.dong_goi.map((dong_goi: IDongGoi) => {
                const inventory = new InventoryModel(getInventoryById(dong_goi.loai_dong_goi.id))

                return {
                    ...dong_goi,
                    inventory
                }
            })
        }
    }, [searchProductAsync.value, getInventoryInPharmacyAsync.value])

    const handleSubmit = () => {
        const { formValues } = formValuesRef.current
        const isValidAll = formValues.every((value: any) => Object.keys(value.errors).length === 0)

        formValues.forEach((form: any) => {
            form.handleSubmit()
        })

        if (!isValidAll) return

        updatePharmacyInventoryAsync.execute({
            pharmacyId,
            adminId: accountInfo.doctor.mId,
            listInventory: formValues.map((formValue: IFormValue) => {
                if (!formValue.values.mPrice || !formValue.values.mStockAmount) return null

                const inventory: any = {
                    mPharmacyId: pharmacyId,
                    mProductId: productId,
                    mProductName: product.name,
                    mPrice: formValue.values.mPrice,
                    mStockAmount: formValue.values.mStockAmount,
                    mPackageId: formValue.dong_goi.loai_dong_goi.id,
                    mPkgName: formValue.dong_goi.loai_dong_goi.name,
                    mStatus: 'ACTIVE'
                }

                if (formValue.dong_goi?.inventory?.mId) {
                    inventory.mId = formValue.dong_goi?.inventory?.mId
                }

                return inventory
            }).filter((x: any) => x)
        }).then(res => setState(prev => ({ ...prev, visible: true })))
    }

    const handleClose = () => {
        setState((prev: any) => ({ ...prev, visible: false }))
    }

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
                        <img src={product.imageUrls[0]} className="img-fluid" />
                    </div>
                    <strong>{product.name}</strong>
                </div>
                <div className="row">
                    <div className="spacing" />
                </div>
                <div className="product-info">
                    {
                        product?.dong_goi?.map((dong_goi: IDongGoi, index) => {
                            return <Formik
                                key={dong_goi.id}
                                enableReinitialize={false}
                                initialValues={dong_goi.inventory || {
                                    mPackageId: '',
                                    mStockAmount: '',
                                    mPrice: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={values => { }}
                            >
                                {({
                                    errors,
                                    isSubmitting,
                                    submitCount,
                                    values,
                                    handleChange,
                                    handleSubmit
                                }) => {
                                    formValuesRef.current.formValues[index] = {
                                        dong_goi,
                                        errors,
                                        values,
                                        handleSubmit,
                                        isSubmitting
                                    }
                                    return <Form
                                        className="login-form"
                                        noValidate={true}
                                        validated={submitCount > 0}
                                        onChange={handleChange}
                                        onSubmit={handleSubmit}>
                                        <Form.Group className="d-flex justify-content-between align-items-center">
                                            <Form.Label>Đơn vị</Form.Label>
                                            <div className="w-50">
                                                <Form.Control readOnly name='mPackageId' as="select" custom>
                                                    <option>{dong_goi.loai_dong_goi.name}</option>
                                                </Form.Control>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="d-flex justify-content-between align-items-center">
                                            <Form.Label>Số lượng</Form.Label>
                                            <div className="w-50">
                                                <Form.Control value={values.mStockAmount} name='mStockAmount' type="number" />
                                                <Form.Control.Feedback type="invalid">{errors.mStockAmount}</Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="d-flex justify-content-between align-items-center">
                                            <Form.Label>Đơn giá(VND)</Form.Label>
                                            <div className="w-50">
                                                <Form.Control value={values.mPrice} name='mPrice' type="number" />
                                                <Form.Control.Feedback type="invalid">{errors.mPrice}</Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                }}
                            </Formik>
                        })
                    }
                    <div className="fixed-button d-flex justify-content-between">
                        <button type="button" className="btn btn-white" data-dismiss="modal">Hủy</button>
                        <Button className="btn btn-orange d-flex align-items-center" onClick={handleSubmit}>
                            <span className="mr-2">HOÀN THÀNH</span>
                            {updatePharmacyInventoryAsync.status === "loading" && < Loading />}
                        </Button>
                    </div>
                </div>
            </div>
        </div >
        <Modal show={state.visible} onHide={handleClose}>
            <div className="modal-dialog m-0" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <img src="./images/check.svg" alt="cancel" className="img-fluid" width={48} />
                    </div>
                    <div className="modal-body">
                        <h4>Cập nhật thành công!</h4>
                    </div>
                    <div className="modal-footer">
                        <button className="btn" onClick={() => history.push('/inventory-of-pharmacy')} >OK</button>
                    </div>
                </div>
            </div>
        </Modal>
    </div >
})

export default FormProduct