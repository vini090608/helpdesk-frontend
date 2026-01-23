type Props = React.ComponentProps<"table"> 

export function Table({children ,...rest }: Props){
    return(
        <table {...rest}>
            <thead>
                <tr>
                    <td className="text-sm"> </td>
                </tr>
            </thead>
            <tbody>
                <tr>{children}</tr>
            </tbody>
        </table>
    )    
}