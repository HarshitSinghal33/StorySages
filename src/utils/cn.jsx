import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classNameInputs){
    return twMerge(clsx(classNameInputs))
}