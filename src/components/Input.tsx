type Props = React.ComponentProps<"input"> & {
    legend?: string
}

export function Input({legend, type="text",...rest}: Props ){
    return(
        <fieldset className="mb-10 flex flex-1 max-h-20 text-gray-200">
            {legend &&
                <legend className="uppercase text-xxs text-gray-300">
                    {legend}
                </legend>
            }

            <input type={type} className="w-full h-12 border-b border-gray-500 px-4 text-sm text-gray-100 outline-none focus:border-b-2 focus:border-blue-dark bg-transparent" 
            {...rest} />
            
        </fieldset>
    )
}