import client from "./base"
import { ProductModel } from '../models/product'

export type ISearchProduct = {
    search: string
    from: number
    size: number
}

export const searchProduct = async (query: any) => {
    return await client.get(
        `https://s-dev.medigoapp.com/product/_search`,
        {
            auth: {
                username: 'medigo-es',
                password: 'ikHVvc8!9%HmuUe8dTs#S2H%'
            },
            params: {
                source: query,
                source_content_type: 'application/json'
            }
        }
    ).then(res => {
        return {
            data: res?.data?.hits?.hits.map((product: any) => {
                return new ProductModel({
                    _id: product._id,
                    ...product._source
                })
            }),
            total: res?.data?.hits?.total?.value
        }
    })
}