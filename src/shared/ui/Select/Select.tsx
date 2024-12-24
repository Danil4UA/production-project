import React, { ChangeEvent, memo, useMemo } from "react";
import { classNames, Modes } from "shared/lib/classNames/classNames";
import * as cls from "./Select.module.scss";

interface SelectOptions {
    value: string;
    content: string;
}
interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOptions[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
    const { 
        className, 
        label, 
        options,
        onChange,
        value,
        readonly
    } = props

    const optionList = useMemo(
        () =>
            options?.map((item) => (
                <option key={item.value} className={cls.option} value={item.value}>
                    {item.content}
                </option>
            )),
        [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
    }

    const modes: Modes = {}
    return (
        <div className={classNames(cls.Wrapper, modes, [className])}>
            {label && 
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            }
            <select 
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                disabled={readonly}
            >
                {optionList}
            </select>
        </div>
    );
});

export default Select;