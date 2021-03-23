import { PharmacyDetailModel } from './../models/pharmacy';
import {
    atom,
} from 'recoil';

export const pharmacyDataState = atom({
    key: "pharmacyState",
    default: {} as PharmacyDetailModel
})