interface Props {
    children: string | React.ReactNode,
    variant?: "title" | "subtitle1" | "subtitle2" | "body1" | "body2" | "paragraph",
    className?: string
}

const Typography = (
    {
        children,
        variant,
        className
    }: Props
) => {
    return (
        <p className={`${
            variant === "title" ? 'text-5xl font-bold ' : 
            variant === "subtitle1" ? 'text-3xl font-[600] ' :
            variant === "subtitle2" ? 'text-xl font-[600] ' :
            variant === "body1" ? 'text-lg font-[600] ' :
            variant === "body2" ? 'text-base font-normal ' :
            variant === "paragraph" ? 'text-sm font-normal ' :
            ''
        } ${className}`}>{children}</p>
    );
}

export default Typography;