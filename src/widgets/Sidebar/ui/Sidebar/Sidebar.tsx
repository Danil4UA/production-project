/* eslint-disable react/jsx-key */
import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./Sidebar.module.scss"
import { memo, useMemo, useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher";
import Button, { ButtonSize, ThemeButton } from "shared/ui/Button/Button";
import { SidebarItemsList } from "widgets/Sidebar/model/items";
import SidebarItem from "../SidebarItem/SidebarItem";


interface SidebarProps {
    className?: string;
}

export const Sidebar = memo( ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    const itemsList = useMemo(() => {
        return SidebarItemsList.map((item)=> (
            <SidebarItem 
                item={item}
                collapsed={collapsed}
                key={item.path }
            />
        ))
    }, [collapsed])
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
                {itemsList}
            </div>
            <div className={classNames(cls.switchers)}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </div>
    );
});

export default Sidebar;