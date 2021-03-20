import React from "react"
import { useSetRecoilState } from "recoil"
import { accountState } from "../recoil"
import { login, ILoginRequest, setAccountInfo } from '../api'

export const useAccount = () => {
    const setAccountState = useSetRecoilState(accountState.accountDataState)

    const loginAsync = async (payload: ILoginRequest) => {
        return await login(payload).then(res => {
            setAccountState(res)
            setAccountInfo(res)
            return res
        })
    }

    return {
        loginAsync
    }
}