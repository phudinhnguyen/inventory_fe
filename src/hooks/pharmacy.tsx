import { getDetailPharmacy, getPharmacyInfoLocal } from "../api"
import { CONFIG } from "../config"

interface IPharmacyLocalInfo {
    pharmacyId: string,
    pharmacyCode: string
}

const usePharmacy = () => {
    return {
        getCurrentDetailPharmacy: async () => {
            const { pharmacyCode }: any = getPharmacyInfoLocal()

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