export class InventoryModel {
    mCreated: string
    mEsModified: string
    mId: number
    mModified: string
    mPackageId: string
    mPharmacyId: string
    mPkgName: string
    mPrice: number
    mProductId: string
    mProductName: string
    mStatus: string
    mStockAmount: number

    constructor(inventory: any) {
        this.mCreated = inventory?.mCreated || ''
        this.mEsModified = inventory?.mEsModified || ''
        this.mId = inventory?.mId || null
        this.mModified = inventory?.mModified || ''
        this.mPackageId = inventory?.mPackageId || ''
        this.mPharmacyId = inventory?.mPharmacyId || ''
        this.mPkgName = inventory?.mPkgName || ''
        this.mPrice = inventory?.mPrice || ''
        this.mProductId = inventory?.mProductId || ''
        this.mProductName = inventory?.mProductName || ''
        this.mStatus = inventory?.mStatus || ''
        this.mStockAmount = inventory?.mStockAmount || ''
    }
}