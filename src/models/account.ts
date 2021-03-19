import { DoctorModel } from '.';

export interface LoginInfoModel {
    doctor: DoctorModel;
    token: string;
}