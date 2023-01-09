import { ChangeEventHandler } from "react";

interface Props {
    type?: "text" | "password" | "email" | "checkbox" | "file",
    className?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    defaultValue?: string | number,
    label?: string,
    required?: boolean,
    accept?: string
}

const Input = ({
    type,
    className,
    onChange,
    placeholder,
    defaultValue,
    label,
    required,
    accept
}: Props) => {
    return (
        <div className={`form-control ${type !== "checkbox" && 'w-full'}`}>
            {
                type !== 'checkbox' &&
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            }
            <input accept={accept} required={required} defaultValue={defaultValue} onChange={onChange} type={type} placeholder={placeholder} className={`${type !== "checkbox" && 'input input-bordered w-full'} ${className}`} />
        </div>
    );
}

export default Input;