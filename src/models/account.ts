import { DoctorModel } from '.';

export class LoginInfoModel {
    doctor: DoctorModel;
    loginSession: {
        mToken: string
        mUserId: string
        mTtl: string
        mCreated: string
    }

    constructor(loginInfo: any) {
        this.doctor = loginInfo.doctor || new DoctorModel({})
        this.loginSession = loginInfo.loginSession || {}
    }
}