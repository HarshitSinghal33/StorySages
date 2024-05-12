import { useState, useRef } from "react";
import { removeSpace } from "../utils/removeSpace";

export function useCheckFormChange({ initialData }) {
    const [isFormValuesChange, setIsFormValueChange] = useState(false);
    const handleFormChange = (currentData) => {
        if (initialData && currentData) {
            for (const [field, value] of Object.entries(currentData)) {
                const removeSpacedValue = removeSpace(value);
                if (initialData[field] !== removeSpacedValue) {
                    setIsFormValueChange(true)
                    break;
                }
                setIsFormValueChange(false);
            }
        }
    }

    return { isFormValuesChange, handleFormChange }
}