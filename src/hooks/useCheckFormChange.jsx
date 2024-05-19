import { useState } from "react";
import { removeSpace } from "../utils/removeSpace";

export function useCheckFormChange({ initialData }) {
    const [isFormValuesChange, setIsFormValueChange] = useState(false);
    const handleFormChange = (currentData) => {
        if (initialData && currentData) {
            for (const [field, value] of Object.entries(currentData)) {
                if (field === 'story') {
                    if (initialData[field].length != value.length) {
                        setIsFormValueChange(true)
                        break;
                    } else {
                        setIsFormValueChange(false);
                    }

                    const isEqual = (obj1, obj2) => {
                        if (typeof obj1 !== typeof obj2) return false;
                        if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
                            return obj1 === obj2;
                        }
                    
                        const keys1 = Object.keys(obj1);
                        const keys2 = Object.keys(obj2);
                        if (keys1.length !== keys2.length) return false;
                    
                        for (let key of keys1) {
                            if (!isEqual(obj1[key], obj2[key])) {
                                return false;
                            }
                        }
                        return true;
                    };
                    
        
                    let storiesMatch = true;
                    for (const obj1 of initialData[field]) {
                        const match = value.some(obj2 => isEqual(obj1, obj2));
                        if (!match) {
                            storiesMatch = false;
                            setIsFormValueChange(true);
                            break;
                        }
                    }
        
                    if (!storiesMatch) {
                        break;
                    }
                    continue;
                }
                const removeSpacedValue = removeSpace(value);
                if (removeSpacedValue && (initialData[field] !== removeSpacedValue)) {
                    setIsFormValueChange(true)
                    break;
                }
                setIsFormValueChange(false);
            }
        }
    }

    return { isFormValuesChange, handleFormChange }
}