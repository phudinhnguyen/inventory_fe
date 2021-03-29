import { CONFIG } from '../config';
import { PharmacyDetailModel, PharmacyModel } from './../models/pharmacy';
import client from "./base"

export type IGetListPharmacyRequest = {
    mName: string
    offset: number
    limit: number
    adminId: string
}

export const getListPharmacy = async (params: IGetListPharmacyRequest) => {
    return await client.get(
        `http://dev-api.medigo.xyz/admins/${params.adminId}/pharmacies`,
        { params }
    ).then((res) => {
        return res?.data?.map((item: any) => new PharmacyModel(item))
    })
}

export type IGetDetailPharmacy = {
    pharmacyCode: string
}

export const getDetailPharmacy = async (params: IGetDetailPharmacy) => {
    return await client.get(`http://dev-api.medigo.xyz/admin/pharmacy/detail/pharmacy-code/${params.pharmacyCode}`)
        .then(res => {
            return new PharmacyDetailModel(res?.data)
        })
}

export const getPharmacyInfoLocal = () => {
    const jsonPharmacyInfo: any = localStorage.getItem(CONFIG.PHARMACY_INFO)
    return JSON.parse(jsonPharmacyInfo) as {
        pharmacyCode: string,
        pharmacyId: number
    }
}