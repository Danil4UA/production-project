import { memo, useCallback } from "react";
import { Currency } from "../../model/types/currency";
import { classNames } from "shared/lib/classNames/classNames";
import Select from "shared/ui/Select/Select";

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?:boolean;
}

export const CurrencySelect = memo( ({ className, value, onChange, readonly }: CurrencySelectProps) => {

    const options = [
        {value: Currency.ILS, content: Currency.ILS},
        {value: Currency.EUR, content: Currency.EUR},
        {value: Currency.USD, content: Currency.USD},
    ]

    const onChangeHandler = useCallback(()=>{
        onChange?.(value as Currency)
    }, [onChange, value])
    return (
        <Select 
            className={classNames("", {}, [className])} 
            label={"Choose Currency"} options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />

    );
});

export default CurrencySelect;
