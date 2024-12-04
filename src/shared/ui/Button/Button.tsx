import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./Button.module.scss";
import { ButtonHTMLAttributes, FC } from "react";


export const enum ThemeButton {
    CLEAR = "clear",
    CLEAR_INVERTED = "clearInverted",
    OUTLINE = "outline",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
    M ="size_m",
    L ="size_l",
    XL ="size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme? : ThemeButton;
    square?: boolean;
    size?: ButtonSize
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        square,
        size = ButtonSize.M,
        ...otherProps
    } = props

    const modes: Record<string, boolean> = {
        [cls.square]: square,
        [cls[size]]: true,
    }
    return (
        <button className={classNames(cls.Button, modes, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;