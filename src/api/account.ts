import { DoctorModel, LoginInfoModel } from '../models'
import client from './base'
import { decode } from "jsonwebtoken";

export type ILoginRequest = {
    mEmail: string
    mPassword: string
}

export const login = async (payload: ILoginRequest): Promise<LoginInfoModel> => {
    return await client.post('http://dev-api.medigo.xyz/admin/signin/basic', payload).then(res => {
        const { loginSession, userInfo } = res?.data

        return {
            loginSession,
            doctor: new DoctorModel(userInfo)
        } as LoginInfoModel
    })
}

// export const CONFIG = {
//     TOKEN_FIELD: "medigo_inventory_token"
// }

// export const setToken = (token: string) => {
//     if (typeof token == "string") {
//         localStorage.setItem(CONFIG.TOKEN_FIELD, token);
//     }
// };

// export const getToken = () => {
//     const token = localStorage.getItem(CONFIG.TOKEN_FIELD);
//     return token
// };

// export const removeToken = () => {
//     localStorage.removeItem(CONFIG.TOKEN_FIELD);
// };

// export const getInfoFromToken = () => {
//     const token = getToken();
//     if (!token) return

//     const info = decode(token)

//     return info;
// };

export const CONFIG = {
    ACCOUNT_INFO_FIELD: "MEDIGO_INVENTORY_ACCOUNT_INFO"
}

export const setAccountInfo = (accountInfo: LoginInfoModel) => {
    localStorage.setItem(CONFIG.ACCOUNT_INFO_FIELD, JSON.stringify(accountInfo))
}

export const getAccountInfo = () => {
    const accountInfo: any = localStorage.getItem(CONFIG.ACCOUNT_INFO_FIELD)

    return JSON.parse(accountInfo) as LoginInfoModel
}