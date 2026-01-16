type Props = React.ComponentProps<"select"> & {
    legend?: string

}

export function Select({legend, children, ...rest}: Props ){
    return(
        <fieldset className="flex flex-1 max-h-20 text-gray-200">
            {legend &&
                <legend className="uppercase text-xxs text-gray-300">
                    {legend}
                </legend>
            }

            <select className="w-full h-12 border-b border-gray-500 px-4 text-sm text-gray-100 outline-none focus:border-b-2 focus:border-blue-dark bg-transparent"
            {...rest}>
                <option value="" disabled hidden>Selecione</option>
                {children}
            </select>
        </fieldset>
    )
}