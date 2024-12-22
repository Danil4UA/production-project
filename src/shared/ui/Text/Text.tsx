/* eslint-disable no-unused-vars */
import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./Text.module.scss";
import { memo } from "react";

export enum TextTheme {
    PRIMARY = "primary",
    ERROR = "error"
}

export enum TextAlign {
    RIGHT = "right",
    LEFT = "left",
    CENTER = "center"
}
interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
}

export const Text = memo( (props: TextProps) => {
    const {
        className, 
        title, 
        text, 
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
    } = props

    const modes = {
        [cls[theme]]: true,
        [cls[align]]: true
    }
    return (
        <div className={classNames("", modes, [className])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});

export default Text;