export class DoctorModel {
    mId?: string
    mStatus: string
    mEmail: string
    mDisplayName: string
    mDesc: string
    mTel: string
    mPassword: string
    mPubnubChannel: string
    mAddress: string
    mRefCode: string
    mCreated?: string
    mModified?: string

    constructor(doctor: DoctorModel) {
        this.mId = doctor.mId || ''
        this.mStatus = doctor.mStatus || ''
        this.mEmail = doctor.mEmail || ''
        this.mDisplayName = doctor.mDisplayName || ''
        this.mDesc = doctor.mDesc || ''
        this.mTel = doctor.mTel || ''
        this.mPassword = doctor.mPassword || ''
        this.mPubnubChannel = doctor.mPubnubChannel || ''
        this.mAddress = doctor.mAddress || ''
        this.mRefCode = doctor.mRefCode || ''
        this.mCreated = doctor.mCreated || ''
        this.mModified = doctor.mModified || ''
    }
}