type ServiceStatus = "active" | "inactive"

type Service = {
    name: string
    amount: number
    status: ServiceStatus
}