type CallAPIStatus = "open" | "processing" | "ended"

type CallAPIResponse = {
    id: number
    title: string
    description: string
    status: CallAPIStatus
    amount: number
    userId: string
    technicalId: string
    category: string
    user: {
        name: string
    }
    technical: {
        name: string
    }
    updatedAt: string
}