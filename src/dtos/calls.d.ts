type CallAPIResponse = {
    id: string
    userId: string
    name: string
    category: CategoriesAPIEnum
    amount: number
    filename: string
    user: {
        name: string
    }
    technical: {
        name: string
    }
}