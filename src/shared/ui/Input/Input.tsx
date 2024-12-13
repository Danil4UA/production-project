import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./Input.module.scss";
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">
interface InputProps extends HTMLInputProps{
    className?: string;
    value?: string;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string)=> void;
    autofocus?: boolean;

}

// eslint-disable-next-line react/display-name
export const Input = memo((props: InputProps) => {

    const {
        className,
        value,
        onChange,
        type = "text",
        placeholder,
        autofocus,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition]= useState(0)

    useEffect(()=>{
        if(autofocus){
            setIsFocused(true)
            ref.current?.focus()
        }
    }, [autofocus])
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length)

    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0)
    }
    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {placeholder + ">"}
                </div>
            )}
            <div>

            </div>

            <div className={cls.caretWrapper}>
                <input 
                    ref={ref}
                    type={type} 
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        className={cls.caret}
                        style={{left: `${caretPosition * 9}px`}}
                    />
                )}
            </div>
        </div>
    )
});

export default Input;