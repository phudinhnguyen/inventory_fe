export class PharmacyModel {
    mId: string
    mPharCode: string
    mName: string
    mDescription: string
    mType: string
    mStatus: string
    mCreated: string
    mModified: string
    mRateValue: number
    mPharGroupId: string
    mRateTimes: string
    mIsDev: any
    mCommissionRate: number
    mCommissionUnit: string
    mSearchDistance: number
    mAbilityLevel: number
    mGpp: string
    mPharmacyRankingId: number
    mSuccessRate: number

    constructor(pharmacy: any) {
        this.mId = pharmacy?.mId || ''
        this.mPharCode = pharmacy?.mPharCode || ''
        this.mName = pharmacy?.mName || ''
        this.mDescription = pharmacy?.mDescription || ''
        this.mType = pharmacy?.mType || ''
        this.mStatus = pharmacy?.mStatus || ''
        this.mCreated = pharmacy?.mCreated || ''
        this.mModified = pharmacy?.mModified || ''
        this.mRateValue = pharmacy?.mRateValue || ''
        this.mPharGroupId = pharmacy?.mPharGroupId || ''
        this.mRateTimes = pharmacy?.mRateTimes || ''
        this.mIsDev = pharmacy?.mIsDev || ''
        this.mCommissionRate = pharmacy?.mCommissionRate || ''
        this.mCommissionUnit = pharmacy?.mCommissionUnit || ''
        this.mSearchDistance = pharmacy?.mSearchDistance || ''
        this.mAbilityLevel = pharmacy?.mAbilityLevel || ''
        this.mGpp = pharmacy?.mGpp || ''
        this.mPharmacyRankingId = pharmacy?.mPharmacyRankingId || ''
        this.mSuccessRate = pharmacy?.mSuccessRate || ''
    }
}