import React, { CSSProperties, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./Avatar.module.scss";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
    const modes = {}
    const styles = useMemo<CSSProperties>(()=> {
        return {
            with: size || 100,
            height: size || 100,
        }
    }, [size])

    return (
        <img 
            src={src} 
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, modes, [className])} 
        />
    )
};

export default Avatar;