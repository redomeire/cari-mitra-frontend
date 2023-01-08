import { MouseEventHandler } from "react";

interface Props {
    children: React.ReactNode,
    className?: String,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "button"
}

const Button = (
    {
        children,
        className,
        onClick,
        type
    }: Props
) => {
    return ( 
        <button
        type={type}
        onClick={onClick}
        className={`text-white rounded-lg bg-green-700 p-2 hover:brightness-75 transition duration-200 text-sm ${className}`}>{children}</button>
     );
}
 
export default Button;