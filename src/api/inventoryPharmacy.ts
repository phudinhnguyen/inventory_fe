import { ProductModel } from "../models"
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
                ...new ProductModel({
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
        payload.inventoryItems,
    )
}