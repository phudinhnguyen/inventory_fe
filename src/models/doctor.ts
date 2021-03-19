export class DoctorModel {
    mId?: number;
    mStatus: string = 'ACTIVE';
    mEmail: string = '';
    mDisplayName: string = '';
    mDesc: string = '';
    mTel: string = '';
    mPassword: string = '';
    mPubnubChannel: string = '';
    mAddress: string = '';
    mRefCode: string = '';
    mCreated?: string;
    mModified?: string;
}
