import client from "./base"

export type ISearchProduct = {
    search: string
    from: number
    size: number
}

export const searchProduct = async (params: ISearchProduct) => {
    const { search, from, size } = params
    console.log('params: ', params);

    return await client.get(
        `https://s-dev.medigoapp.com/product/_search?pretty=true`,
        {
            params: {
                query: {
                    match: {
                        name: search
                    }
                },
                from,
                size
            }
        }
    )
}