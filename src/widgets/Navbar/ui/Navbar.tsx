import { classNames } from "shared/lib/classNames/classNames"
import * as cls from "./Navbar.module.scss"
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    const {t} = useTranslation()
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={classNames(cls.links)}>
                <AppLink theme={AppLinkTheme.SECONDARY} to={"/"} className={cls.mainLink}>{t("Navbar main page")}</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to={"/about"}>{t("Navbar about page")}</AppLink>
            </div>
        </div>
    )

}

 