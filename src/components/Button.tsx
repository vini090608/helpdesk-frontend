import { classMerge } from "../utils/classMerge"

type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean
    variant?: "xs" | "sm" | "md" | "lg"
}

const variants = {
    button: {
        xs: "h6 w-6",
        sm: "h-8 ",
        md: "h-10 w-full ",
        lg: "h-12 w-full",
    }
}

export function Button({ children, isLoading, className, type="button", variant= "lg", ...rest }: Props){
    return <button type={type} disabled={isLoading} className={classMerge(["flex items-center justify-center bg-gray-200 rounded-lg text-sm text-white cursor-pointer hover:bg-blue-dark transition ease-linear", variants.button[variant], isLoading && "cursor-progress" ,className])} {...rest} >
        { children }
    </button>
}