export type CallDashboardProps = {
    updatedAt: string
    id: string
    title: string
    serviceName: string
    amount: string
    technical: string
    status: string


}

type Props = React.ComponentProps<"a"> & {
    data: CallDashboardProps
}

export function CallDashboard({ data, ...rest }: Props){
    return(
        <h1>Pizza</h1>
        // <a {...rest} className="flex items-center gap-3 hover:bg-green-100/5 cursor-pointer rounded-md p-2">
        //     <img src={data.categoryImg} alt="Ícone da categoria" className="w-8 h-8" />

        //     <div className="flex flex-col flex-1">
        //         <strong className="text-sm text-gray-100">{data.name}</strong>
        //         <span className="text-xs text-gray-200">{data.description}</span>
        //     </div>

        //     <span className="text-sm text-gray-100 font-semibold">
        //         <small className="font-normal text-gray-200">R$</small>
        //         {data.amount}
        //     </span>
        // </a>
    )    
}