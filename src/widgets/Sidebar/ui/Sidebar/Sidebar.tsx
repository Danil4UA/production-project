import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./Sidebar.module.scss"
import { useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher";
import Button, { ButtonSize, ThemeButton } from "shared/ui/Button/Button";
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainIcon from "shared/assets/icons/home_icon.svg"
import AboutIcon from "shared/assets/icons/about_icon.svg"


interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const {t} = useTranslation()
    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>

            <Button 
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ThemeButton.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {collapsed? ">" : "<"} 
            </Button>
            <div className={cls.items}>
             
                
                <AppLink 
                    theme={AppLinkTheme.SECONDARY} 
                    to={RoutePath.main} 
                    className={cls.item}
                    
                >
                    <MainIcon className={cls.icon}/>
                    <span
                        className={cls.link}
                    >
                        {t("Navbar main page")}
                    </span>
                    
                </AppLink>
    

                <AppLink 
                    theme={AppLinkTheme.SECONDARY} 
                    to={RoutePath.about} 
                    className={cls.item}
                    
                >
                    <AboutIcon className={cls.icon}/>
                    <span
                        className={cls.link}
                    >
                        {t("Navbar about page")}
                    </span>
                    
                </AppLink>

                
            </div>
            <div className={classNames(cls.switchers)}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </div>
    );
};

export default Sidebar;