import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./ThemeSwitcher.module.scss"
import { useTheme, Theme } from "app/providers/ThemeProvider";
import LightIcon from "shared/assets/icons/light_icon.svg"
import DarkIcon from "shared/assets/icons/dark_icon.svg"
import Button, { ThemeButton } from "shared/ui/Button/Button";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const {theme, toggleTheme} = useTheme()

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}>

        {theme === Theme.DARK ? <DarkIcon width={"32px"}/> : <LightIcon width={"32px"}/> }
        </Button>

    );
};

export default ThemeSwitcher;