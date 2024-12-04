import { classNames } from "shared/lib/classNames/classNames"
import * as cls from "./Navbar.module.scss"
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import Modal from "shared/ui/Modal/Modal";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { useCallback, useState } from "react";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    const {t} = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const onToggleModal = useCallback(()=>{
        setIsAuthModal((prev)=>!prev)
    }, [])
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ThemeButton.CLEAR}
                onClick={onToggleModal}
                className={classNames(cls.links)}>
                {t("Enter")}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal} >
                {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti incidunt eum unde laborum amet explicabo alias quae dolore nobis ullam?"}
            </Modal>
        </div>
    )

}

 