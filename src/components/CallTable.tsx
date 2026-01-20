import { Button } from "./Button"
import Pencil from "../assets/icons/pen-line.svg"

export type CallItemProps = {
    updateAt: string
    id: string
    title: string
    category: string
    amount: number
    user: {
        name: string
    }
    technical: {
        name: string
    }
    status:CallAPIStatus
}

type Props = React.ComponentProps<"a"> & {
    data: CallItemProps
}

export function CallTable({ data, ...rest }: Props){
    return(
        <tr>
            <td className="text-sm">{data.updateAt}</td>

            <td className="text-sm font-semibold">{data.id}</td>

            <td className="flex flex-col flex-1">
                <span className="text-sm text-gray-200 font-bold">{data.title}</span>
                <span className="text-xs text-gray-200">{data.category}</span>
            </td>

            <td className="text-sm">R${data.amount}</td>

            <td className="text-sm" >{data.user.name}</td>

            <td className="text-sm">{data.technical.name}</td>

            <td className="text-sm">{data.status}</td>

            <a {...rest} >
                <Button variant="xs" className="bg-gray-400 rounded-2xl">
                    <img src={Pencil} alt="" />
                </Button>   
            </a>
        </tr>
    )    
}