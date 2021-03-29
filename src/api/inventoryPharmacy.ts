import { InventoryModel } from "../models"
import client from "./base"

export type IGetInventoryItems = {
    adminId: string,
    pharmacyId: string,
    filter: {
        offset: number,
        limit: number,
        skip: number,
        order: string,
        where?: {
            additionalProp1: {}
        },
    }
}

export const getInventoryInPharmacy = async (params: IGetInventoryItems) => {
    const { pharmacyId, adminId, filter } = params

    return await client.get(
        `http://dev-pharmacy-inventory-api.medigo.xyz/pis/inventory-management/admins/${adminId}/pharmacies/${pharmacyId}/inventory-items`,
        { params: { filter } }
    ).then(res => {
        return res.data?.map((product: any) => {
            return {
                ...new InventoryModel({
                    ...product,
                    _id: product.mProductId,
                    name: product.mProductName
                })
            }
        })
    })

    // return await client.get(
    //     `http://dev-pharmacy-inventory-api.medigo.xyz/pis/inventory-management/pharmacies/${pharmacyId}/inventory-items?filter=%7B%0A%20%20%22limit%22%3A%2010%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22mProductId%22%3A%20%226040c505ba6295400a17bf57%22%0A%20%20%7D%0A%7D`
    // )
}

export type IUpdatePharmacyInventoryRequest = {
    adminId: string,
    pharmacyId: string,
    listInventory: Array<{
        mId?: number;
        mCreated?: Date;
        mModified?: Date;
        mStatus?: string;
        mPharmacyId?: number;
        mProductId?: string;
        mPrice?: number;
        mStockAmount?: number;
        mPackageId?: string;
        mEsModified?: Date;
        mProductName?: string;
        mPkgName?: string;
    }>
}

export const updatePharmacyInventory = async (payload: IUpdatePharmacyInventoryRequest) => {
    const { adminId, pharmacyId } = payload

    return await client.post(
        `http://dev-pharmacy-inventory-api.medigo.xyz/pis/inventory-management/admins/${adminId}/pharmacies/${pharmacyId}/inventory-items/batch`,
        payload.listInventory,
    )
}