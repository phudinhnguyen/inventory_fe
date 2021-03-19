import {
    atom,
    selectorFamily
} from 'recoil';
import { LoginInfoModel } from '../models'

export const accountDataState = atom({
    key: "accountState",
    default: {} as LoginInfoModel
})