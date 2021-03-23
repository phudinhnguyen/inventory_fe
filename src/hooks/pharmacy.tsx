import { getDetailPharmacy } from "../api"
import { CONFIG } from "../config"

interface IPharmacyLocalInfo {
    pharmacyId: string,
    pharmacyCode: string
}

const usePharmacy = () => {
    return {
        getCurrentDetailPharmacy: async () => {
            const jsonPharmacyInfo: any = localStorage.getItem(CONFIG.PHARMACY_INFO)
            const { pharmacyCode }: any = JSON.parse(jsonPharmacyInfo)

            return await getDetailPharmacy({ pharmacyCode }).then(res => {
                return res
            })
        },

        setCurrentPharmacy: async (pharmacyInfo: IPharmacyLocalInfo) => {
            localStorage.setItem(CONFIG.PHARMACY_INFO, JSON.stringify(pharmacyInfo))
        },
    }
}

export default usePharmacy