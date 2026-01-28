type CallAPIStatus = "open" | "processing" | "ended"

type CallAPIResponse = {
    id: number
    title: string
    describe: string
    status: CallAPIStatus
    serviceAmount: number
    services: {
        name: string
        amount: number
        status: ServiceStatus
    }
    amount: Number
    userId: string
    serviceName: string
    client: {
        name: string | null
    }
    technical: {
        name: string | null
        email: string | null
    }
    updatedAt: string
    createdAt: string
}