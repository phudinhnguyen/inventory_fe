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

export class PharmacyAddressModel {
    mAddress: string
    mBelongToId: number
    mCreated: string
    mGeoPoint: { lng: number, lat: number }
    mId: number
    mModified: string
    mType: any
    constructor(pharmacyAddress: any) {
        this.mAddress = pharmacyAddress?.mAddress || ''
        this.mBelongToId = pharmacyAddress?.mBelongToId
        this.mCreated = pharmacyAddress?.mCreated || ''
        this.mGeoPoint = pharmacyAddress?.mGeoPoint || { lng: 0, lat: 0 }
        this.mId = pharmacyAddress?.mId || ''
        this.mModified = pharmacyAddress?.mModified || ''
        this.mType = pharmacyAddress?.mType
    }
}

export class PharmacyOwnersModel {
    mAvatar: string
    mCreated: string
    mCurrentReceiveRequest: number
    mDisplayName: string
    mEmail: string
    mId: string
    mIsDev: any
    mLastActive: any
    mMaxReceiveRequest: number
    mModified: string
    mPharCode: string
    mPharId: string
    mRole: string
    mStatus: string
    mTelNumber: string
    mType: string
    mUserAgent: any
    constructor(pharmacyOwners: any) {
        this.mAvatar = pharmacyOwners?.mAvatar || ''
        this.mCreated = pharmacyOwners?.mCreated || ''
        this.mCurrentReceiveRequest = pharmacyOwners?.mCurrentReceiveRequest || 0
        this.mDisplayName = pharmacyOwners?.mDisplayName || ''
        this.mEmail = pharmacyOwners?.mEmail || ''
        this.mId = pharmacyOwners?.mId || ''
        this.mIsDev = pharmacyOwners?.mIsDev || ''
        this.mLastActive = pharmacyOwners?.mLastActive || ''
        this.mMaxReceiveRequest = pharmacyOwners?.mMaxReceiveRequest || ''
        this.mModified = pharmacyOwners?.mModified || ''
        this.mPharCode = pharmacyOwners?.mPharCode || ''
        this.mPharId = pharmacyOwners?.mPharId || ''
        this.mRole = pharmacyOwners?.mRole || ''
        this.mStatus = pharmacyOwners?.mStatus || ''
        this.mTelNumber = pharmacyOwners?.mTelNumber || ''
        this.mType = pharmacyOwners?.mType || ''
        this.mUserAgent = pharmacyOwners?.mUserAgent || ''
    }
}

export class PharmacyWalletsModel {
    mBalance: number
    mBelongToId: string
    mCreated: string
    mCurrency: string
    mId: string
    mModified: string
    mStatus: string
    mType: string
    constructor(pharmacyWallet: any) {
        this.mBalance = pharmacyWallet?.mBalance || ''
        this.mBelongToId = pharmacyWallet?.mBelongToId || ''
        this.mCreated = pharmacyWallet?.mCreated || ''
        this.mCurrency = pharmacyWallet?.mCurrency || ''
        this.mId = pharmacyWallet?.mId || ''
        this.mModified = pharmacyWallet?.mModified || ''
        this.mStatus = pharmacyWallet?.mStatus || ''
        this.mType = pharmacyWallet?.mType || ''
    }
}

export class PharmacyDetailModel {
    pharmacy: PharmacyModel
    pharmacyAddress: PharmacyAddressModel
    pharmacyOwners: Array<PharmacyOwnersModel>
    pharmacyRegisterFile: Array<any>
    pharmacyWallets: Array<PharmacyWalletsModel>
    constructor(pharmacyDetail: any) {
        this.pharmacy = pharmacyDetail?.pharmacy || new PharmacyModel({})
        this.pharmacyAddress = pharmacyDetail?.pharmacyAddress || new PharmacyAddressModel({})
        this.pharmacyOwners = pharmacyDetail?.pharmacyOwners || new PharmacyOwnersModel({})
        this.pharmacyRegisterFile = pharmacyDetail?.pharmacyRegisterFile || []
        this.pharmacyWallets = pharmacyDetail?.pharmacyWallets || []
    }
}