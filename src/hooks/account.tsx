import React from "react"
import { useSetRecoilState } from "recoil"
import { accountState } from "../recoil"
import { DoctorModel } from "../models"

export const useAccount = () => {
    const setAccountState = useSetRecoilState(accountState.accountDataState)

    const login = async (payload: { email: string, password: string }) => {
        // call api
        setAccountState({ doctor: new DoctorModel(), token: "testToken" })
        return Promise.resolve("data")
    }

    return {
        login
    }
}