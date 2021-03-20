import { PharmacyModel } from './../models/pharmacy';
import client from "./base"

export type IGetListPharmacyRequest = {
    mName: string
    offset: number
    limit: number
}

export const getListPharmacy = async (params: IGetListPharmacyRequest) => {
    return await client.get(
        `http://dev-api.medigo.xyz/admin/pharmacy/list`,
        { params }
    ).then((res) => {
        return res?.data?.data?.map((item: any) => new PharmacyModel(item))
    })
}

export type IGetInventoryItems = {
    pharmacyId: string,
    filter: {
        offset: number,
        limit: number,
        skip: number,
        order: string,
        where?: {
            additionalProp1: {}
        },
        fields?: {
            mId?: string
            mCreated?: string
            mModified?: string
            mStatus?: string
            mPharmacyId?: string
            mProductId?: string
            mPrice?: string
            mStockAmount?: string
            mPackageId?: string
            mEsModified?: string
        }
    }
}

export const getInventoryItemsInPharmacy = async (params: IGetInventoryItems) => {
    const { pharmacyId, filter } = params

    return await client.get(
        `http://dev-pharmacy-inventory-api.medigo.xyz/pis/inventory-management/pharmacies/${ pharmacyId }/inventory-items`,
        { params: { filter } }
    )
}

export type IUpdatePharmacyInventoryItemsRequest = {
    adminId: string,
    pharmacyId: string,
    inventoryItems: Array<{
        mId: number
        mCreated: string
        mModified: string
        mStatus: string
        mPharmacyId: number
        mProductId: string
        mPrice: number
        mStockAmount: number
        mPackageId: string
        mEsModified: string
    }>
}

export const updatePharmacyInventoryItems = async (payload: IUpdatePharmacyInventoryItemsRequest) => {
    return await client.post(
        `http://dev-pharmacy-inventory-api.medigo.xyz/pis/inventory-management/admins/123123/pharmacies/123123/inventory-items/batch`,
        payload,
    )
}