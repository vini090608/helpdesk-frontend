type CallAPIStatus = "open" | "processing" | "ended"

type CallAPIResponse = {
    id: number
    title: string
    description: string
    status: CallAPIStatus
    serviceAmount: number
    userId: string
    serviceName: string
    user: {
        name: string
    }
    technical: {
        name: string | null
    }
    updatedAt: string
}