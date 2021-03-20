import { DoctorModel } from '.';

export interface LoginInfoModel {
    doctor: DoctorModel;
    loginSession: {
        mToken: string
        mUserId: string
        mTtl: string
        mCreated: string
    };
}