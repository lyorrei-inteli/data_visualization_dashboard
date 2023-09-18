import { LucideIcon } from "lucide-react";
import React from "react";

export enum InputDesign {
    DEFAULT = "DEFAULT",
    LOGIN = "LOGIN",
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    register: any;
    name: string;
    className?: string;
    label?: string;
    errors?: any;
    Icon?: LucideIcon;
    selectDesign?: boolean;
    containerClassName?: string;
    inputDesign?: InputDesign;
}

export const Input: React.FC<InputProps> = ({
    label,
    Icon,
    errors,
    register,
    containerClassName,
    className,
    name,
    inputDesign = InputDesign.DEFAULT,
    ...rest
}) => {
    const error = errors?.[name]?.message;

    switch (inputDesign) {
        case InputDesign.LOGIN:
            return (
                <div className={containerClassName}>
                    {label && <label className={"text-lg mb-1 block"}>{label}</label>}
                    <div className="border-2 p-3 w-full border-primary flex items-center gap-4 rounded">
                        {Icon && <Icon />}
                        <input
                            className={`grow py-1 bg-transparent outline-none ${className}`}
                            {...register(name)}
                            {...rest}
                        />
                    </div>
                    {error && <span className="text-red-800 mt-1 block">{error}</span>}
                </div>
            );
        default:
            return (
                <div className={containerClassName}>
                    {label && <label className={"text-lg mb-1 block"}>{label}</label>}
                    <div className="w-full flex items-center gap-4">
                        {Icon && <Icon />}
                        <input
                            className={`grow px-4 py-3 outline-none rounded ${className}`}
                            {...register(name)}
                            {...rest}
                        />
                    </div>
                    {error && <span className="text-red-800 mt-1 block">{error}</span>}
                </div>
            );
    }
};
