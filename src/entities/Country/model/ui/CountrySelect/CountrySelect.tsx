/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback } from "react";
import { Country } from "../../types/country";
import { classNames } from "shared/lib/classNames/classNames";
import Select from "shared/ui/Select/Select";

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?:boolean;
}

export const CountrySelect = memo( ({ className, value, onChange, readonly }: CountrySelectProps) => {

    const options = [
        {value: Country.Israel, content: Country.Israel},
        {value: Country.USA, content: Country.USA},
        {value: Country.Ukraine, content: Country.Ukraine},
    ]

    const onChangeHandler = useCallback(
        (value: string) => {
            if (onChange) onChange(value as Country);
        },
        [onChange, value],
    );

    return (
        <Select 
            className={classNames("", {}, [className])} 
            label={"Choose Country"} 
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />

    );
});

export default CountrySelect;
